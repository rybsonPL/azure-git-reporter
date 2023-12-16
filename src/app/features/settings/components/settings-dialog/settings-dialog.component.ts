import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-settings-dialog',
  standalone: true,
  imports: [],
  templateUrl: './settings-dialog.component.html',
  styleUrl: './settings-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsDialogComponent {}
