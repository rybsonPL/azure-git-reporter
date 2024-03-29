import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { changesMock, commitsMock, repositoriesMock } from '@backend/mocks';
import { ApiService } from '@backend/service';
import { ReportData } from '@features/generate-report/models';
import { provideSettingsServiceMock } from '@features/settings';
import { of } from 'rxjs';

import { GetReportDataService } from './get-report-data.service';

describe('GetReportDataService', () => {
  let getReportDataService: GetReportDataService, apiService: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), GetReportDataService, ApiService, provideSettingsServiceMock()],
    });

    getReportDataService = TestBed.inject(GetReportDataService);
    apiService = TestBed.inject(ApiService);
  });

  describe('getData()', () => {
    let repositoriesSpy: jasmine.Spy, commitsSpy: jasmine.Spy, changesSpy: jasmine.Spy, result: ReportData;
    const generationDate = new Date('2023-12-26T17:11:06.181Z');

    beforeEach(done => {
      repositoriesSpy = spyOn(apiService, 'getRepositories').and.returnValue(of(repositoriesMock));
      commitsSpy = spyOn(apiService, 'getCommits').and.returnValue(of(commitsMock));
      changesSpy = spyOn(apiService, 'getChanges').and.returnValue(of(changesMock));

      getReportDataService
        .getData({
          reportDates: [new Date('2023-12-01T00:00:00'), new Date('2023-12-31T23:59:59')],
          generationDate,
        })
        .subscribe(changesDto => (result = changesDto));

      done();
    });

    it('should call apiService.getRepositories() twice, because 2 projects', () => {
      expect(repositoriesSpy).toHaveBeenCalledTimes(2);
    });

    it('should call apiService.getCommits() 6 times, because 2 projects with 3 repositories', () => {
      expect(commitsSpy).toHaveBeenCalledTimes(6);
    });

    it('should call apiService.getChanges() 12 times, because 2 projects with 3 repositories with 6 commits', () => {
      expect(changesSpy).toHaveBeenCalledTimes(30);
    });

    it('should return ReportData with 30 commits and generationDate', () => {
      expect(result.commits.length).toBe(30);
      expect(result.generationDate).toEqual(generationDate);
    });
  });
});
