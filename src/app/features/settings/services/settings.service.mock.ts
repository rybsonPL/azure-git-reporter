import { signal } from '@angular/core';

import { Settings } from '../models/settings.model';

export const settingsServiceMock = {
  getSettings() {
    const settings: Settings = {
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

    return signal(settings).asReadonly();
  },
};
