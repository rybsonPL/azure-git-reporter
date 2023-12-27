import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-unfilled-settings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './unfilled-settings.component.html',
  styleUrl: './unfilled-settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnfilledSettingsComponent {}
