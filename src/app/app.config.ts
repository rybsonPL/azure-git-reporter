import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

import { apiVersionInterceptor, authorizationInterceptor, handleErrorsInterceptor } from '@core/interceptors';

export const appConfig: ApplicationConfig = {
  providers: [
    MessageService,
    DialogService,
    provideAnimations(),
    provideHttpClient(withInterceptors([authorizationInterceptor, apiVersionInterceptor, handleErrorsInterceptor])),
  ],
};
