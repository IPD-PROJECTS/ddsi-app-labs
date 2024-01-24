import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ControlModel } from '@ddsi-labs-apps/models';
import { AppRunningConfigService } from '../app-running-config/app-running-config.service';

const controlsEndpoint = `api/v1/controls/`

@Injectable({
  providedIn: 'root'
})
export class ControlsService {
  baseUrl = this.appConfig.getAppInputConfig()?.apiUrl;
  constructor(private http: HttpClient, private appConfig: AppRunningConfigService) { }

  getListControl(params?: any) {
    // const data: HttpParams = params ? new HttpParams().append('offset', params?.page * params?.limit).append('size', params?.limit) : new HttpParams();
    return this.http.get(`${this.baseUrl}/${controlsEndpoint}`);
  }


  updateControl(data: ControlModel) {
    return this.http.put(`${this.baseUrl}/${controlsEndpoint}/${data.id}`, data);
  }

  deleteControl(data: ControlModel) {
    return this.http.delete(`${this.baseUrl}/${controlsEndpoint}/${data.id}`);
  }
  createControl(data: ControlModel) {
    return this.http.post(`${this.baseUrl}/${controlsEndpoint}`, data);
  }
}
