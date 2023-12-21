import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { SettingsService } from '@features/settings';
import { Observable } from 'rxjs';

export function authorizationInterceptor(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const settings = inject(SettingsService).getSettings();
  const securitySettings = settings()?.securityInfo;

  if (!request.url.includes('dev.azure.com') && !request.url.includes('_apis/git/repositories/')) {
    return next(request);
  }

  const clonedRequest = request.clone({
    setHeaders: {
      Authorization: 'Basic ' + btoa(securitySettings?.domainEmail + ':' + securitySettings?.token),
    },
  });

  return next(clonedRequest);
}
