import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { SettingsService, settingsServiceMock } from '@features/settings';

import { authorizationInterceptor } from './authorization.interceptor';

describe('authorizationInterceptor', () => {
  let httpTestingController: HttpTestingController, httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([authorizationInterceptor])),
        provideHttpClientTesting(),
        {
          provide: SettingsService,
          useValue: settingsServiceMock,
        },
      ],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  describe('when request url is correct', () => {
    it('should add Basic token based on given username and token', () => {
      const url = 'http://dev.azure.com/test_test/_apis/git/repositories';

      httpClient.get(url).subscribe();

      const { request } = httpTestingController.expectOne(url);

      expect(request.headers.get('Authorization')?.includes('Basic')).toBeTrue();
    });
  });

  describe('when request url is not correct', () => {
    it('should not add Basic token', () => {
      const url = '/';

      httpClient.get(url).subscribe();

      const { request } = httpTestingController.expectOne(url);

      expect(request.headers.get('Authorization')?.includes('Basic')).toBeFalsy();
    });
  });
});
