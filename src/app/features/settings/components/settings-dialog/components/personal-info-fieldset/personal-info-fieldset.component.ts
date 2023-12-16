import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CalendarModule } from 'primeng/calendar';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-personal-info-fieldset',
  standalone: true,
  imports: [FieldsetModule, InputTextModule, CalendarModule],
  templateUrl: './personal-info-fieldset.component.html',
  styleUrls: ['../fieldset.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonalInfoFieldsetComponent {}
