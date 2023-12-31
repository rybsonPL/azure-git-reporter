import { Injectable, inject } from '@angular/core';
import { SettingsDialogComponent, SettingsService } from '@features/settings';
import { DialogService } from 'primeng/dynamicdialog';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HeaderNavigationService {
  private readonly dialogService = inject(DialogService);
  private readonly settingsService = inject(SettingsService);

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
