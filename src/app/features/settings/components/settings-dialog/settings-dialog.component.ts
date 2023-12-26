import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Settings } from '@features/settings/models/settings.model';
import { emailValidator, validateArray } from '@shared/validators';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

import { PersonalInfoFieldsetComponent } from './components/personal-info-fieldset/personal-info-fieldset.component';
import { RepositoryInfoFieldsetComponent } from './components/repository-info-fieldset/repository-info-fieldset.component';
import { SecurityInfoFieldsetComponent } from './components/security-info-fieldset/security-info-fieldset.component';

@Component({
  selector: 'app-settings-dialog',
  standalone: true,
  imports: [
    PersonalInfoFieldsetComponent,
    RepositoryInfoFieldsetComponent,
    SecurityInfoFieldsetComponent,
    ButtonModule,
    ReactiveFormsModule,
    JsonPipe,
  ],
  templateUrl: './settings-dialog.component.html',
  styleUrl: './settings-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsDialogComponent implements OnInit {
  private readonly dialogRef = inject(DynamicDialogRef);
  private readonly dialogConfig = inject(DynamicDialogConfig);
  private readonly fb = inject(NonNullableFormBuilder);

  protected readonly today = new Date();
  protected readonly form = this.fb.group({
    personalInfo: this.fb.group({
      fullName: this.fb.control('', [Validators.maxLength(200)]),
      managerName: this.fb.control('', [Validators.maxLength(200)]),
      contractDate: this.fb.control<Date | null>(null),
    }),
    repositoryInfo: this.fb.group({
      organization: this.fb.control('', [Validators.maxLength(200)]),
      emails: this.fb.control<string[]>([], [validateArray([Validators.maxLength(200), emailValidator()])]),
      projects: this.fb.control<string[]>([], [validateArray([Validators.maxLength(200)])]),
    }),
    securityInfo: this.fb.group({
      domainEmail: this.fb.control('', [Validators.maxLength(200), emailValidator()]),
      token: this.fb.control('', [Validators.maxLength(200)]),
    }),
  });

  ngOnInit(): void {
    this.initFormValue(this.dialogConfig.data.settings);
  }

  private initFormValue(settings: Settings | null): void {
    if (!settings) return;

    const mappedSettings = {
      ...settings,
      personalInfo: {
        ...settings.personalInfo,
        contractDate: settings.personalInfo.contractDate ? new Date(settings.personalInfo.contractDate) : null,
      },
    };

    this.form.setValue(mappedSettings);
  }

  protected close(): void {
    const settingsValue = this.form.getRawValue();

    const mappedSettingsValue: Settings = {
      ...settingsValue,
      personalInfo: {
        ...settingsValue.personalInfo,
        contractDate: settingsValue.personalInfo.contractDate?.toISOString() || '',
      },
    };

    this.dialogRef.close(mappedSettingsValue);
  }
}
