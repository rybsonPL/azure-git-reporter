import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GenerateReportCardComponent } from '@features/generate-report';
import { SettingsDialogComponent, SettingsService } from '@features/settings';
import { HeaderComponent } from '@shell/components';
import { DialogService } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import { tap } from 'rxjs';

import { primengConfig } from '@core/prime-ng.config';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, GenerateReportCardComponent, ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private readonly dialogService = inject(DialogService);
  private readonly settingsService = inject(SettingsService);

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
          settings: this.settingsService.getSettings()(),
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
}
