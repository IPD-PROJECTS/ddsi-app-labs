import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENV_KEY } from '../../util';
import { PlateModel } from 'src/app/models/plate.model';

const BASE_URL = `${process.env[ENV_KEY.BASE_URL]}`;
const platesEndpoint = `${BASE_URL}/api/v1/plates/`

@Injectable({
  providedIn: 'root'
})
export class PlatePlanService {

  constructor(private http: HttpClient) { }

  getListPlates(params?: any) {
    const data: HttpParams = params ? new HttpParams().append('offset', params?.page * params?.limit).append('limit', params?.limit) : new HttpParams();
    return this.http.get<{results: PlateModel[], count: number}>(`${platesEndpoint}`, { params: data});
  }

  updatePlate(data: PlateModel) {
    return this.http.put(`${platesEndpoint}/${data.id}`, data);
  }

  deletePlate(data: PlateModel) {
    return this.http.delete(`${platesEndpoint}/${data.id}`);
  }

  createPlate(data: PlateModel) {
    return this.http.post(`${platesEndpoint}`, data)
  }
}
