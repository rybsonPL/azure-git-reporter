import { Injectable, effect, signal } from '@angular/core';

import { Settings } from '../models/settings.model';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private readonly SETTINGS_KEY = 'azure-git-reporter-settings';
  readonly settings = signal<Settings | null>(this.getSettings());

  constructor() {
    effect(() => this.saveSettings(this.settings()));
  }

  private saveSettings(settings: Settings | null): void {
    if (settings) {
      localStorage.setItem(this.SETTINGS_KEY, JSON.stringify(settings));
    }
  }

  private getSettings(): Settings | null {
    const settings = localStorage.getItem(this.SETTINGS_KEY);

    return settings ? (JSON.parse(settings) as Settings) : null;
  }
}
