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
  styleUrls: ['../fieldset.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonalInfoFieldsetComponent {
  @Input() form!: FormGroupFrom<Omit<Settings['personalInfo'], 'contractDate'> & { contractDate: Date }>;

  protected readonly today = new Date();
}
