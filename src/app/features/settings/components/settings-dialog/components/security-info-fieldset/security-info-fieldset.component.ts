import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-security-info-fieldset',
  standalone: true,
  imports: [FieldsetModule, InputTextModule, PasswordModule],
  templateUrl: './security-info-fieldset.component.html',
  styleUrls: ['../fieldset.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SecurityInfoFieldsetComponent {}
