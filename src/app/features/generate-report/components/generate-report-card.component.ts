import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GenerateReportFormValue } from '@features/generate-report';
import { SettingsService } from '@features/settings';

import { GenerateReportCardStore } from './generate-report-card.store';
import { GenerateReportFormComponent } from './generate-report-form/generate-report-form.component';

@Component({
  selector: 'app-generate-report-card',
  standalone: true,
  imports: [GenerateReportFormComponent],
  templateUrl: './generate-report-card.component.html',
  styleUrl: './generate-report-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [GenerateReportCardStore],
})
export class GenerateReportCardComponent {
  private readonly settingsService = inject(SettingsService);
  private readonly generateReportCardStore = inject(GenerateReportCardStore);

  protected readonly settings = this.settingsService.getSettings();
  protected readonly isSettingsFilled = this.settingsService.isSettingsFilled();

  protected generateData(formValue: GenerateReportFormValue): void {
    this.generateReportCardStore.generateFile(formValue);
  }
}
