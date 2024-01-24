import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PlateTypeModel } from '@ddsi-labs-apps/models';
import { AppRunningConfigService } from '../app-running-config/app-running-config.service';

const plateTypesEndpoint = `api/v1/plate-types/`
@Injectable({
  providedIn: 'root'
})
export class PlateTypeService {
  baseUrl = this.appConfig.getAppInputConfig()?.apiUrl;
  constructor(private http: HttpClient,private appConfig: AppRunningConfigService) { }

  getListPlateType(params?: any) {
    return this.http.get<PlateTypeModel[]>(`${this.baseUrl}/${plateTypesEndpoint}`);
  }


  updatePlateType(data: PlateTypeModel) {
    return this.http.put(`${this.baseUrl}/${plateTypesEndpoint}/${data.id}`, data);
  }

  deletePlateType(data: PlateTypeModel) {
    return this.http.delete(`${this.baseUrl}/${plateTypesEndpoint}/${data.id}`);
  }
  createPlateType(data: PlateTypeModel) {
    return this.http.post(`${this.baseUrl}/${plateTypesEndpoint}`, data);
  }
}
