import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PlateTypeModel } from '../../models/plate-type.model';
import { ENV_KEY } from '../../enum';

const BASE_URL = `${process.env[ENV_KEY.BASE_URL]}`;
const plateTypesEndpoint = `${BASE_URL}/api/v1/plate-types/`
@Injectable({
  providedIn: 'root'
})
export class PlateTypeService {

  constructor(private http: HttpClient) { }

  getListPlateType(params?: any) {
    return this.http.get<PlateTypeModel[]>(`${plateTypesEndpoint}`);
  }


  updatePlateType(data: PlateTypeModel) {
    return this.http.put(`${plateTypesEndpoint}/${data.id}`, data);
  }

  deletePlateType(data: PlateTypeModel) {
    return this.http.delete(`${plateTypesEndpoint}/${data.id}`);
  }
  createPlateType(data: PlateTypeModel) {
    return this.http.post(`${plateTypesEndpoint}`, data);
  }
}
