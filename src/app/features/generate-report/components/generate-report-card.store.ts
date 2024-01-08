import { Injectable, computed, inject, signal } from '@angular/core';
import { CallState } from '@shared/types';
import { tap } from 'rxjs';

import { GenerateReportFormValue, ReportData, ReportPdfRow } from '../models';
import { GenerateReportPdfService, GetReportDataService } from '../services';

interface GenerateReportCardState {
  callState: CallState;
}

const initialState: GenerateReportCardState = {
  callState: 'INIT',
};

@Injectable()
export class GenerateReportCardStore {
  private readonly generateReportPdfService = inject(GenerateReportPdfService);
  private readonly getReportDataService = inject(GetReportDataService);

  private readonly state = signal<GenerateReportCardState>(initialState);

  public readonly viewModel = computed(() => ({ isLoading: this.state().callState === 'LOADING' }));

  public generateFile(formValue: GenerateReportFormValue): void {
    this.state.update(state => ({ ...state, callState: 'LOADING' }));

    this.getReportDataService
      .getData(formValue)
      .pipe(
        tap(({ commits, generationDate }) => {
          this.generateReportPdfService.generate({ reportRows: this.mapToReportPdfRows(commits), generationDate });
          this.state.update(state => ({ ...state, callState: 'SUCCESS' }));
        })
      )
      .subscribe();
  }

  private mapToReportPdfRows(commits: ReportData['commits']): ReportPdfRow[] {
    return commits
      .sort((a, b) => a.commitDate.getTime() - b.commitDate.getTime())
      .flatMap(({ changes, commitDate, project }) => changes.flatMap(change => ({ ...change, commitDate, project })));
  }
}
