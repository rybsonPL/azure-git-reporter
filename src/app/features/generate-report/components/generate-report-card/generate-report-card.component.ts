import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { GenerateReportFormValue } from '@features/generate-report/models/generate-report-form-value.model';
import { endOfDay, lastDayOfMonth, parseISO, startOfDay, startOfMonth } from 'date-fns';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-generate-report-card',
  standalone: true,
  imports: [ButtonModule, CalendarModule, CheckboxModule, JsonPipe, ReactiveFormsModule],
  templateUrl: './generate-report-card.component.html',
  styleUrl: './generate-report-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenerateReportCardComponent {
  private readonly fb = inject(NonNullableFormBuilder);

  @Output() generateForm = new EventEmitter<GenerateReportFormValue>();
  @Input({
    required: true,
    transform: (value: string) => parseISO(value),
  })
  contractDate!: Date;

  protected readonly lastDayOfMonth = lastDayOfMonth(new Date());
  protected readonly form = this.fb.group({
    reportDates: this.fb.control<Date[]>([startOfMonth(new Date()), this.lastDayOfMonth]),
    generationDate: this.fb.control(new Date()),
    skipMergesToMaster: this.fb.control<boolean[]>([true]),
    skipMergesFromMaster: this.fb.control<boolean[]>([true]),
  });

  protected onSubmit(): void {
    const formValue = this.form.getRawValue();

    const generateReportFormValue: GenerateReportFormValue = {
      reportDates: [startOfDay(formValue.reportDates[0]), endOfDay(formValue.reportDates[1])] as [Date, Date],
      generationDate: formValue.generationDate,
      skipMergesToMaster: !!formValue.skipMergesToMaster[0],
      skipMergesFromMaster: !!formValue.skipMergesFromMaster[0],
    };

    this.generateForm.next(generateReportFormValue);
  }
}
