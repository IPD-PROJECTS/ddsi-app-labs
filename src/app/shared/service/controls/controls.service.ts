import { Injectable } from '@angular/core';
import { ENV_KEY } from '../../util';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ControlModel } from 'src/app/models/controls.model';

const BASE_URL = `${process.env[ENV_KEY.BASE_URL]}`;
const controlsEndpoint = `${BASE_URL}/api/v1/controls/`

@Injectable({
  providedIn: 'root'
})
export class ControlsService {

  constructor(private http: HttpClient) { }

  getListControl(params?: any) {
    // const data: HttpParams = params ? new HttpParams().append('offset', params?.page * params?.limit).append('size', params?.limit) : new HttpParams();
    return this.http.get(`${controlsEndpoint}`);
  }


  updateControl(data: ControlModel) {
    return this.http.put(`${controlsEndpoint}/${data.id}`, data);
  }

  deleteControl(data: ControlModel) {
    return this.http.delete(`${controlsEndpoint}/${data.id}`);
  }
  createControl(data: ControlModel) {
    return this.http.post(`${controlsEndpoint}`, data);
  }
}
