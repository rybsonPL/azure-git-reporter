import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  ChangesDto,
  CommitsDto,
  GetChangesPayload,
  GetCommitsPayload,
  GetRepositoriesPayload,
  RepositoriesDto,
} from '@backend/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  readonly http = inject(HttpClient);

  readonly baseUrl = 'https://dev.azure.com';

  getRepositories({ organization, project }: GetRepositoriesPayload): Observable<RepositoriesDto> {
    return this.http.get<RepositoriesDto>(`${this.baseUrl}/${organization}/${project}/_apis/git/repositories`);
  }

  getCommits({
    organization,
    project,
    repositoryId,
    user,
    fromDate,
    toDate,
  }: GetCommitsPayload): Observable<CommitsDto> {
    return this.http.get<CommitsDto>(
      `${this.baseUrl}/${organization}/${project}/_apis/git/repositories/${repositoryId}/commits`,
      {
        params: {
          'searchCriteria.user': user,
          'searchCriteria.fromDate': fromDate,
          'searchCriteria.toDate': toDate,
        },
      }
    );
  }

  getChanges({ organization, project, repositoryId, commitId }: GetChangesPayload): Observable<ChangesDto> {
    return this.http.get<ChangesDto>(
      `${this.baseUrl}/${organization}/${project}/_apis/git/repositories/${repositoryId}/commits/${commitId}/changes`
    );
  }
}
