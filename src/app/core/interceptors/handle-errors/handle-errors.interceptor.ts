import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { EMPTY, Observable, catchError, throwError, timeout } from 'rxjs';

export function handleErrorsInterceptor(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const messageService = inject(MessageService);

  if (!request.url.includes('dev.azure.com') && !request.url.includes('_apis/git/repositories/')) {
    return next(request);
  }

  return next(request).pipe(
    timeout(10000),
    catchError((error: HttpErrorResponse) => {
      if (error.status === 0) {
        messageService.add({ summary: 'Connection lost', detail: 'Try again', severity: 'error' });

        return throwError(() => new Error('Connection lost'));
      }

      if (error.status >= 400 && error.status < 500) {
        if (error.error.typeKey === 'GitRepositoryNotFoundException') {
          return EMPTY;
        }

        messageService.add({ summary: 'Client-side error', detail: error.message, severity: 'error' });

        return throwError(() => new Error(`Client-side error: ${error.message}`));
      }

      if ((error as Error).name === 'TimeoutError') {
        messageService.add({ summary: 'Timeout error', detail: 'Try again later', severity: 'error' });

        return throwError(() => new Error('Timeout error'));
      }

      messageService.add({ summary: 'Server-side error', detail: error.message, severity: 'error' });

      return throwError(() => new Error(`Server-side error: ${error.message}`));
    })
  );
}
