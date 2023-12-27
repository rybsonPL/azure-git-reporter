import { Injectable, Signal, computed, effect, signal } from '@angular/core';
import { allPropertiesTruthy } from '@shared/utils';

import { Settings } from '../models/settings.model';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private readonly SETTINGS_KEY = 'azure-git-reporter-settings';
  private readonly settings = signal<Settings | null>(this.getInitialSettings());

  constructor() {
    effect(() => this.saveSettings(this.settings()));
  }

  public getSettings(): Signal<Settings | null> {
    return this.settings.asReadonly();
  }

  public updateSettings(settings: Settings): void {
    return this.settings.set(settings);
  }

  public isSettingsFilled(): Signal<boolean> {
    return computed(() => allPropertiesTruthy(this.settings()));
  }

  private saveSettings(settings: Settings | null): void {
    if (settings) {
      localStorage.setItem(this.SETTINGS_KEY, JSON.stringify(settings));
    }
  }

  private getInitialSettings(): Settings | null {
    const settings = localStorage.getItem(this.SETTINGS_KEY);

    return settings ? (JSON.parse(settings) as Settings) : null;
  }
}
