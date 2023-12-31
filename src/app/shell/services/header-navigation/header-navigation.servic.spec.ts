import { TestBed } from '@angular/core/testing';
import {
  Settings,
  SettingsDialogComponent,
  SettingsService,
  provideSettingsServiceMock,
  settingsMock,
} from '@features/settings';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { of } from 'rxjs';

import { HeaderNavigationService } from './header-navigation.service';

describe('HeaderNavigationService', () => {
  let headerNavigationService: HeaderNavigationService, dialogService: DialogService, settingsService: SettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DialogService, provideSettingsServiceMock()],
    });

    headerNavigationService = TestBed.inject(HeaderNavigationService);
    dialogService = TestBed.inject(DialogService);
    settingsService = TestBed.inject(SettingsService);
  });

  it('should open settings dialog with given data and update settings', () => {
    const expectedInputData = {
      header: 'Settings',
      closable: true,
      width: 'min(60rem, 95%)',
      closeOnEscape: true,
      data: {
        settings: settingsMock,
      },
    };
    const expectedOutputData: Settings = settingsMock;

    const dialogServiceSpy = spyOn(dialogService, 'open').and.returnValue({
      onClose: of(expectedOutputData),
    } as DynamicDialogRef);
    const updateSettingsSpy = spyOn(settingsService, 'updateSettings');

    headerNavigationService.openSettings();

    expect(dialogServiceSpy).toHaveBeenCalledOnceWith(SettingsDialogComponent, expectedInputData);
    expect(updateSettingsSpy).toHaveBeenCalledOnceWith(expectedOutputData);
  });
});
