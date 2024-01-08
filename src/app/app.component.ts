import '@angular/common/locales/global/pl';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GenerateReportCardComponent } from '@features/generate-report';
import { HeaderComponent } from '@shell/components';
import { HeaderNavigationService } from '@shell/services';
import { ToastModule } from 'primeng/toast';

import { primengConfig } from '@core/config';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, GenerateReportCardComponent, ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private readonly headerNavigationService = inject(HeaderNavigationService);

  constructor() {
    primengConfig();
  }

  openSettings(): void {
    this.headerNavigationService.openSettings();
  }
}
