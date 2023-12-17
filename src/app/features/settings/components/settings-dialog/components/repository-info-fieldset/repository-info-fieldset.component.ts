import { KeyValuePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Settings } from '@features/settings';
import { FormGroupFrom } from '@shared/types';
import { ChipsModule } from 'primeng/chips';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-repository-info-fieldset',
  standalone: true,
  imports: [FieldsetModule, InputTextModule, ChipsModule, ReactiveFormsModule, KeyValuePipe],
  templateUrl: './repository-info-fieldset.component.html',
  styleUrls: ['../fieldset.scss', './repository-info-fieldset.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RepositoryInfoFieldsetComponent {
  @Input({ required: true }) form!: FormGroupFrom<Settings['repositoryInfo']>;
}
