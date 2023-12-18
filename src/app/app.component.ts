import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SettingsService } from '@features/settings';
import { SettingsDialogComponent } from '@features/settings/components/settings-dialog/settings-dialog.component';
import { HeaderComponent } from '@shell/components';
import { DialogService } from 'primeng/dynamicdialog';
import { tap } from 'rxjs';

import { primengConfig } from '@core/prime-ng.config';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [DialogService],
})
export class AppComponent {
  private readonly dialogService = inject(DialogService);
  private readonly settingsService = inject(SettingsService);

  constructor() {
    primengConfig();
  }

  openSettings() {
    this.dialogService
      .open(SettingsDialogComponent, {
        header: 'Settings',
        closable: true,
        width: 'min(60rem, 95%)',
        closeOnEscape: true,
        data: {
          settings: this.settingsService.settings(),
        },
      })
      .onClose.pipe(
        tap(settings => {
          if (settings) {
            this.settingsService.settings.set(settings);
          }
        })
      )
      .subscribe();
  }
}
