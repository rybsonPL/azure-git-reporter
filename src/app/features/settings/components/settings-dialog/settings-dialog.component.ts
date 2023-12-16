import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { validateArray } from '@shared/validators';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

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
export class SettingsDialogComponent {
  private readonly dialogRef = inject(DynamicDialogRef);
  private readonly fb = inject(NonNullableFormBuilder);

  protected today = new Date();

  protected form = this.fb.group({
    personalInfo: this.fb.group({
      fullName: this.fb.control('', [Validators.maxLength(200)]),
      managerName: this.fb.control('', [Validators.maxLength(200)]),
      contractDate: this.fb.control(this.today),
    }),
    repositoryInfo: this.fb.group({
      organization: this.fb.control('', [Validators.maxLength(200)]),
      emails: this.fb.control<string[]>([], [validateArray([Validators.maxLength(200), Validators.email])]),
      projects: this.fb.control<string[]>([], [validateArray([Validators.maxLength(200), Validators.email])]),
    }),
    securityInfo: this.fb.group({
      domainEmail: this.fb.control('', [Validators.maxLength(200), Validators.email]),
      token: this.fb.control('111', [Validators.maxLength(200)]),
    }),
  });

  close(): void {
    this.dialogRef.close();
  }
}
