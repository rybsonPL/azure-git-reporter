import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ChipsModule } from 'primeng/chips';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-repository-info-fieldset',
  standalone: true,
  imports: [FieldsetModule, InputTextModule, ChipsModule],
  templateUrl: './repository-info-fieldset.component.html',
  styleUrls: ['../fieldset.scss', './repository-info-fieldset.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RepositoryInfoFieldsetComponent {}
