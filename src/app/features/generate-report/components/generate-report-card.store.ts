import { Injectable, inject } from '@angular/core';
import { SettingsService } from '@features/settings';
import { tap } from 'rxjs';

import { GenerateReportFormValue } from '../models/generate-report-form-value.model';
import { GenerateReportPdfService } from '../services/generate-report-pdf/generate-report-pdf.service';
import { GetReportDataService } from '../services/get-report-data/get-report-data.service';

@Injectable()
export class GenerateReportCardStore {
  private readonly settingsService = inject(SettingsService);
  private readonly generateReportPdfService = inject(GenerateReportPdfService);
  private readonly getReportDataService = inject(GetReportDataService);

  generateFile(formValue: GenerateReportFormValue): void {
    this.getReportDataService
      .getData(formValue)
      .pipe(tap(reportData => this.generateReportPdfService.generate(reportData)))
      .subscribe();
  }
}
