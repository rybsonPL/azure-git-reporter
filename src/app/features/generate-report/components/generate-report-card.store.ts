import { Injectable, inject } from '@angular/core';
import { SettingsService } from '@features/settings';

import { GenerateReportFormValue } from '../models/generate-report-form-value.model';
import { GenerateReportPdfService } from '../services/generate-report-pdf/generate-report-pdf.service';

@Injectable()
export class GenerateReportCardStore {
  private readonly settingsService = inject(SettingsService);
  private readonly generateReportPdfService = inject(GenerateReportPdfService);

  generateFile(formValue: GenerateReportFormValue): void {
    this.generateReportPdfService.generate(formValue);
  }
}
