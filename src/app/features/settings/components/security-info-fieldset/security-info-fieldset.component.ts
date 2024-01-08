import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Settings } from '@features/settings/models';
import { FormGroupFrom } from '@shared/types';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-security-info-fieldset',
  standalone: true,
  imports: [FieldsetModule, InputTextModule, PasswordModule, ReactiveFormsModule, JsonPipe],
  templateUrl: './security-info-fieldset.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SecurityInfoFieldsetComponent {
  @Input({ required: true }) form!: FormGroupFrom<Settings['securityInfo']>;
}
