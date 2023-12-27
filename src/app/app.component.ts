import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GenerateReportCardComponent, GenerateReportFormValue } from '@features/generate-report';
import { GenerateReportService } from '@features/generate-report/services/generate-report.service';
import { SettingsDialogComponent, SettingsService } from '@features/settings';
import { UnfilledSettingsComponent } from '@features/settings/components/unfilled-settings/unfilled-settings.component';
import { HeaderComponent } from '@shell/components';
import { DialogService } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import { tap } from 'rxjs';

import { primengConfig } from '@core/prime-ng.config';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, GenerateReportCardComponent, ToastModule, UnfilledSettingsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private readonly dialogService = inject(DialogService);
  private readonly settingsService = inject(SettingsService);
  private readonly generateReportService = inject(GenerateReportService);

  protected settings = this.settingsService.getSettings();
  protected isSettingsFilled = this.settingsService.isSettingsFilled();

  constructor() {
    primengConfig();
  }

  openSettings(): void {
    this.dialogService
      .open(SettingsDialogComponent, {
        header: 'Settings',
        closable: true,
        width: 'min(60rem, 95%)',
        closeOnEscape: true,
        data: {
          settings: this.settings(),
        },
      })
      .onClose.pipe(
        tap(settings => {
          if (settings) {
            this.settingsService.updateSettings(settings);
          }
        })
      )
      .subscribe();
  }

  generateForm(formValue: GenerateReportFormValue): void {
    this.generateReportService.generate(formValue);
  }
}
