import { Injectable, inject } from '@angular/core';

import { GenerateReportFormValue } from '../../models/generate-report-form-value.model';
import { GetReportDataService } from '../get-report-data/get-report-data.service';

@Injectable({ providedIn: 'root' })
export class GenerateReportPdfService {
  private readonly getReportDataService = inject(GetReportDataService);

  generate(formValue: GenerateReportFormValue) {
    this.getReportDataService.getData(formValue).subscribe(console.log);
  }
}
