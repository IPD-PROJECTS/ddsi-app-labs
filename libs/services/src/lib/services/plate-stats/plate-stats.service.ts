import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DashboardStatesModel } from '@ddsi-labs-apps/models';
import { AppRunningConfigService } from '../app-running-config/app-running-config.service';


const statsEndpoint = `api/v1/stats/`;

@Injectable({
  providedIn: 'root',
})
export class PlateStatsService {
  constructor(private http: HttpClient, private appConfig: AppRunningConfigService) {}

  getPlatesDashboardStats() {
    const baseUrl = this.appConfig.getAppInputConfig()?.apiUrl;
    return this.http.get<DashboardStatesModel>(`${baseUrl}/${statsEndpoint}`);
  }
}
