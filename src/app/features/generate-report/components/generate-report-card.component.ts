import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GenerateReportFormValue } from '@features/generate-report';
import { SettingsService } from '@features/settings';

import { GenerateReportPdfService } from '../services/generate-report-pdf/generate-report-pdf.service';
import { GetReportDataService } from '../services/get-report-data/get-report-data.service';
import { GenerateReportCardStore } from './generate-report-card.store';
import { GenerateReportFormComponent } from './generate-report-form/generate-report-form.component';

@Component({
  selector: 'app-generate-report-card',
  standalone: true,
  imports: [GenerateReportFormComponent],
  templateUrl: './generate-report-card.component.html',
  styleUrl: './generate-report-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [GenerateReportPdfService, GetReportDataService, GenerateReportCardStore],
})
export class GenerateReportCardComponent {
  private readonly settingsService = inject(SettingsService);
  private readonly generateReportCardStore = inject(GenerateReportCardStore);

  protected readonly settings = this.settingsService.getSettings();
  protected readonly isSettingsFilled = this.settingsService.isSettingsFilled;
  protected readonly viewModel = this.generateReportCardStore.viewModel;

  protected generateData(formValue: GenerateReportFormValue): void {
    this.generateReportCardStore.generateFile(formValue);
  }
}
