import { Injectable, inject } from '@angular/core';
import { ChangesDto } from '@backend/models';
import { ApiService } from '@backend/service';
import { SettingsService } from '@features/settings';
import { formatISO } from 'date-fns';
import { EMPTY, Observable, catchError, filter, from, mergeMap, switchMap, toArray } from 'rxjs';

import { GenerateReportFormValue } from '../models/generate-report-form-value.model';

@Injectable({ providedIn: 'root' })
export class GetReportDataService {
  private readonly apiService = inject(ApiService);
  private readonly settingsService = inject(SettingsService);
  private readonly repositorySettings = this.settingsService.getSettings();

  getData({ reportDates: [fromDate, toDate] }: GenerateReportFormValue): Observable<ChangesDto[]> {
    const emails = this.repositorySettings()!.repositoryInfo.emails;
    const projects = this.repositorySettings()!.repositoryInfo.projects;
    const organization = this.repositorySettings()!.repositoryInfo.organization;

    return from(emails).pipe(
      switchMap(email => {
        return from(projects).pipe(
          mergeMap(project => {
            return this.apiService.getRepositories({ organization, project }).pipe(
              catchError(() => EMPTY),
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
                        catchError(() => EMPTY),
                        filter(commits => commits.count !== 0),
                        switchMap(commits => {
                          return from(commits.value).pipe(
                            mergeMap(commit => {
                              return this.apiService
                                .getChanges({
                                  organization,
                                  project,
                                  commitId: commit.commitId,
                                  repositoryId: repository.id,
                                })
                                .pipe(catchError(() => EMPTY));
                            }, 10)
                          );
                        })
                      );
                  }, 10)
                );
              })
            );
          }, 10)
        );
      }),
      toArray()
    );
  }
}
