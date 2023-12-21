import { Injectable, inject } from '@angular/core';
import { ApiService } from '@backend/service';
import { SettingsService } from '@features/settings';
import { formatISO } from 'date-fns';
import { EMPTY, catchError, filter, from, mergeMap, toArray } from 'rxjs';

import { GenerateReportFormValue } from '../models/generate-report-form-value.model';

@Injectable({ providedIn: 'root' })
export class GetReportDataService {
  private readonly apiService = inject(ApiService);
  private readonly settingsService = inject(SettingsService);
  private readonly repositorySettings = this.settingsService.getSettings();

  getData({ reportDates: [fromDate, toDate] }: GenerateReportFormValue) {
    const emails = this.repositorySettings()!.repositoryInfo.emails;
    const projects = this.repositorySettings()!.repositoryInfo.projects;
    const organization = this.repositorySettings()!.repositoryInfo.organization;

    return from(emails).pipe(
      mergeMap(email => {
        return from(projects).pipe(
          mergeMap(project => {
            return this.apiService.getRepositories({ organization, project }).pipe(
              mergeMap(repositories => {
                return from(repositories.value).pipe(
                  mergeMap(repository =>
                    this.apiService
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
                        filter(commit => commit.count !== 0)
                      )
                  )
                );
              }, 10)
            );
          }, 10)
        );
      }),
      toArray()
    );
  }
}
