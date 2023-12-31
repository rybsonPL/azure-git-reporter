import { Injectable, inject } from '@angular/core';
import { ApiService } from '@backend/service';
import { ReportData } from '@features/generate-report/models/report-data.model';
import { SettingsService } from '@features/settings';
import { formatISO } from 'date-fns';
import { Observable, combineLatest, filter, from, map, mergeMap, of, switchMap, toArray } from 'rxjs';

import { GenerateReportFormValue } from '../../models/generate-report-form-value.model';

@Injectable()
export class GetReportDataService {
  private readonly apiService = inject(ApiService);
  private readonly settingsService = inject(SettingsService);
  private readonly repositorySettings = this.settingsService.getSettings();

  getData({ reportDates: [fromDate, toDate], generationDate }: GenerateReportFormValue): Observable<ReportData> {
    const emails = this.repositorySettings()!.repositoryInfo.emails;
    const projects = this.repositorySettings()!.repositoryInfo.projects;
    const organization = this.repositorySettings()!.repositoryInfo.organization;

    return from(emails).pipe(
      switchMap(email => {
        return from(projects).pipe(
          mergeMap(project => {
            return this.apiService.getRepositories({ organization, project }).pipe(
              switchMap(repositories => {
                return from(repositories.value).pipe(
                  mergeMap(repository => {
                    return this.apiService
                      .getCommits({
                        organization,
                        project,
                        user: email,
                        repositoryId: repository.id,
                        fromDate: formatISO(fromDate),
                        toDate: formatISO(toDate),
                      })
                      .pipe(
                        filter(commits => commits.count !== 0),
                        switchMap(commits => {
                          return from(commits.value).pipe(
                            mergeMap(commit => {
                              return combineLatest([
                                this.apiService.getChanges({
                                  organization,
                                  project,
                                  commitId: commit.commitId,
                                  repositoryId: repository.id,
                                }),
                                of(new Date(commit.author.date)),
                              ]);
                            }, 10)
                          );
                        })
                      );
                  }, 10)
                );
              }),
              map(([changes, commitDate]) => ({ ...changes, project, commitDate }))
            );
          }, 10)
        );
      }),
      toArray(),
      map(changes => ({ changes, generationDate }))
    );
  }
}
