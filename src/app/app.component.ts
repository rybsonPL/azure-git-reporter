import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SettingsDialogComponent } from '@features/settings/components/settings-dialog/settings-dialog.component';
import { HeaderComponent } from '@shell/components';
import { DialogService } from 'primeng/dynamicdialog';

import { primengConfig } from '@core/prime-ng.config';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [DialogService],
})
export class AppComponent implements OnInit {
  private readonly dialogService = inject(DialogService);

  constructor() {
    primengConfig();
  }

  ngOnInit(): void {
    this.openSettings();
  }

  openSettings() {
    this.dialogService.open(SettingsDialogComponent, {
      header: 'Settings',
      closable: true,
      width: 'min(60rem, 95%)',
      closeOnEscape: true,
      modal: true,
    });
  }
}
