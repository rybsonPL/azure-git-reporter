import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

import { apiVersionInterceptor, authorizationInterceptor, handleErrorsInterceptor } from '@core/interceptors';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    MessageService,
    DialogService,
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withInterceptors([authorizationInterceptor, apiVersionInterceptor, handleErrorsInterceptor])),
  ],
};
