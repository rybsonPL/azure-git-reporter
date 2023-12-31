import { makeEnvironmentProviders, signal } from '@angular/core';

import { Settings } from '../models/settings.model';
import { SettingsService } from './settings.service';

export const settingsMock: Settings = {
  personalInfo: {
    contractDate: '2023-12-27T17:46:54Z',
    fullName: 'Full Name',
    managerName: 'Manager Name',
  },
  repositoryInfo: {
    emails: ['email@mock.com'],
    organization: 'Test organization',
    projects: ['Test Project 1', 'Test Project 2'],
  },
  securityInfo: {
    domainEmail: 'domain@email.com',
    token: '123123',
  },
};

export function provideSettingsServiceMock() {
  return makeEnvironmentProviders([
    {
      provide: SettingsService,
      useValue: {
        getSettings() {
          return signal(settingsMock).asReadonly();
        },
        updateSettings(): void {},
      },
    },
  ]);
}
