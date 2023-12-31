import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GenerateReportFormValue } from '@features/generate-report';
import { GenerateReportService } from '@features/generate-report/services/generate-report.service';
import { SettingsService } from '@features/settings';

import { GenerateReportFormComponent } from './components/generate-report-form/generate-report-form.component';

@Component({
  selector: 'app-generate-report-card',
  standalone: true,
  imports: [GenerateReportFormComponent],
  templateUrl: './generate-report-card.component.html',
  styleUrl: './generate-report-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenerateReportCardComponent {
  private readonly settingsService = inject(SettingsService);
  private readonly generateReportService = inject(GenerateReportService);

  protected readonly settings = this.settingsService.getSettings();
  protected readonly isSettingsFilled = this.settingsService.isSettingsFilled();

  protected generateData(formValue: GenerateReportFormValue): void {
    this.generateReportService.generate(formValue);
  }
}
