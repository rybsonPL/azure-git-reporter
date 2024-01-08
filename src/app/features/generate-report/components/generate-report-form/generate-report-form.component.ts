import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { GenerateReportFormValue } from '@features/generate-report/models/generate-report-form-value.model';
import { ContainsErrorPipe } from '@shared/pipes';
import { requiredTruthy, validateArray } from '@shared/validators';
import { endOfDay, lastDayOfMonth, parseISO, startOfDay, startOfMonth } from 'date-fns';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-generate-report-form',
  standalone: true,
  imports: [ButtonModule, CalendarModule, ReactiveFormsModule, ContainsErrorPipe],
  templateUrl: './generate-report-form.component.html',
  styleUrl: './generate-report-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenerateReportFormComponent {
  private readonly fb = inject(NonNullableFormBuilder);

  @Input({
    required: true,
    transform: (value: string) => parseISO(value),
  })
  contractDate!: Date;
  @Input({ required: true }) loading = false;

  @Output() generateData = new EventEmitter<GenerateReportFormValue>();

  protected readonly lastDayOfMonth = lastDayOfMonth(new Date());
  protected readonly form = this.fb.group({
    reportDates: this.fb.control<Date[]>(
      [startOfMonth(new Date()), this.lastDayOfMonth],
      [validateArray([requiredTruthy()])]
    ),
    generationDate: this.fb.control(new Date()),
  });

  protected onSubmit(): void {
    const formValue = this.form.getRawValue();

    const generateReportFormValue: GenerateReportFormValue = {
      reportDates: [startOfDay(formValue.reportDates[0]), endOfDay(formValue.reportDates[1])] as [Date, Date],
      generationDate: formValue.generationDate,
    };

    this.generateData.next(generateReportFormValue);
  }
}
