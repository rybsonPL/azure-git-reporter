import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export function apiVersionInterceptor(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  if (!request.url.includes('dev.azure.com') && !request.url.includes('_apis/git/repositories/')) {
    return next(request);
  }

  const clonedRequest = request.clone({
    setParams: {
      'api-version': '7.1-preview.1',
    },
  });

  return next(clonedRequest);
}
