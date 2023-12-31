import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GenerateReportFormValue } from '@features/generate-report';
import { GenerateReportPdfService } from '@features/generate-report/services/generate-report-pdf/generate-report-pdf.service';
import { SettingsService } from '@features/settings';

import { GenerateReportFormComponent } from './generate-report-form/generate-report-form.component';

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
  private readonly generateReportPdfService = inject(GenerateReportPdfService);

  protected readonly settings = this.settingsService.getSettings();
  protected readonly isSettingsFilled = this.settingsService.isSettingsFilled();

  protected generateData(formValue: GenerateReportFormValue): void {
    this.generateReportPdfService.generate(formValue);
  }
}
