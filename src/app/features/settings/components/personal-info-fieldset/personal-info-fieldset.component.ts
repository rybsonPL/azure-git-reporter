import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Settings } from '@features/settings';
import { FormGroupFrom } from '@shared/types';
import { CalendarModule } from 'primeng/calendar';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-personal-info-fieldset',
  standalone: true,
  imports: [FieldsetModule, InputTextModule, CalendarModule, ReactiveFormsModule],
  templateUrl: './personal-info-fieldset.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonalInfoFieldsetComponent {
  @Input({ required: true }) form!: FormGroupFrom<
    Omit<Settings['personalInfo'], 'contractDate'> & { contractDate: Date | null }
  >;

  protected readonly today = new Date();
}
