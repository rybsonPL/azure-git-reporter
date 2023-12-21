import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { apiVersionInterceptor } from './api-version.interceptor';

describe('authorizationInterceptor', () => {
  let httpTestingController: HttpTestingController, httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(withInterceptors([apiVersionInterceptor])), provideHttpClientTesting()],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  describe('when request url is correct', () => {
    it('should add api version as param', () => {
      const url = 'http://dev.azure.com/test_test/_apis/git/repositories';

      httpClient.get(url).subscribe();

      httpTestingController.expectOne(`${url}?api-version=7.1-preview.1`);
    });
  });

  describe('when request url is not correct', () => {
    it('should not add api version as param', () => {
      const url = '/';

      httpClient.get(url).subscribe();

      const { request } = httpTestingController.expectOne(url);

      expect(request.headers.get('Authorization')?.includes('Basic')).toBeFalsy();
    });
  });
});
