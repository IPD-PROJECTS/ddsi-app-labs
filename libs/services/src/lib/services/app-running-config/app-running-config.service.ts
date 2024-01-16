import { Injectable, inject } from '@angular/core';
import { APP_CONFIG, AppInputConfig } from '@ddsi-labs-apps/models';

@Injectable({
  providedIn: 'root'
})
export class AppRunningConfigService {
  appConfig?: AppInputConfig;
  constructor() {
    this.appConfig = inject(APP_CONFIG);
  }
  getAppInputConfig() {
    return this.appConfig;
  }
}
