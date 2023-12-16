import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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
  ],
  templateUrl: './settings-dialog.component.html',
  styleUrl: './settings-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsDialogComponent {
  private readonly dialogRef = inject(DynamicDialogRef);

  close() {
    this.dialogRef.close();
  }
}
