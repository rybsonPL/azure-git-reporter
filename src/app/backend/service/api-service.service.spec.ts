import { HttpClient, provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ApiService } from './api-service.service';

const mocks = {
  organization: 'mock_organization',
  project: 'mock_project',
  repositoryId: 'mock_repository_id',
  user: 'mock_user',
  fromDate: new Date('2023-01-01').toISOString(),
  toDate: new Date('2023-01-31').toISOString(),
  commitId: 'mock_commit_id',
};

describe('ApiService', () => {
  let service: ApiService, httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
    TestBed.inject(HttpClient);
  });

  describe('methods should call API with right url', () => {
    it('getRepositories()', () => {
      service.getRepositories({ organization: mocks.organization, project: mocks.project }).subscribe();

      httpTestingController.expectOne({
        method: 'GET',
        url: `https://dev.azure.com/mock_organization/mock_project/_apis/git/repositories`,
      });
    });

    it('getCommits()', () => {
      service
        .getCommits({
          organization: mocks.organization,
          project: mocks.project,
          repositoryId: mocks.repositoryId,
          user: mocks.user,
          fromDate: mocks.fromDate,
          toDate: mocks.toDate,
        })
        .subscribe();

      httpTestingController.expectOne({
        method: 'GET',
        url: `https://dev.azure.com/mock_organization/mock_project/_apis/git/repositories/mock_repository_id/commits?searchCriteria.user=mock_user&searchCriteria.fromDate=2023-01-01T00:00:00.000Z&searchCriteria.toDate=2023-01-31T00:00:00.000Z&searchCriteria.$top=1000`,
      });
    });

    it('getChanges()', () => {
      service
        .getChanges({
          organization: mocks.organization,
          project: mocks.project,
          repositoryId: mocks.repositoryId,
          commitId: mocks.commitId,
        })
        .subscribe();

      httpTestingController.expectOne({
        method: 'GET',
        url: `https://dev.azure.com/mock_organization/mock_project/_apis/git/repositories/mock_repository_id/commits/mock_commit_id/changes`,
      });
    });
  });
});
