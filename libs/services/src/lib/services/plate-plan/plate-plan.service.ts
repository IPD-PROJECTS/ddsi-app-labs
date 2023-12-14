import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { DialogService } from 'primeng/dynamicdialog';
import { PlateModel } from '@ddsi-labs-apps/models';
import { ENV_KEY } from '@ddsi-labs-apps/enums';

const BASE_URL = `${process.env[ENV_KEY.BASE_URL]}`;
const platesEndpoint = `${BASE_URL}/api/v1/plates/`;



@Injectable({
  providedIn: 'root',
})
export class PlatePlanService {
  constructor(
    private http: HttpClient,
    private dialogService: DialogService,
  ) {}

  getListPlates(params?: any) {
    const data: HttpParams = params
      ? new HttpParams()
          .append('p', params?.page + 1)
          .append('size', params?.limit)
      : new HttpParams();
    return this.http.get<{ results: PlateModel[]; count: number }>(
      `${platesEndpoint}`,
      { params: data }
    );
  }

  updatePlate(data: PlateModel) {
    return this.http.patch(`${platesEndpoint}${data.id}`, data);
  }

  getPlateDetailsById(id: string | null) {
    if (id) {
      return this.http.get(`${platesEndpoint}${id}`);
    }
    return of();
  }

  deletePlate(data: PlateModel) {
    return this.http.delete(`${platesEndpoint}${data.id}`);
  }

  createPlate(data: PlateModel) {
    return this.http.post(`${platesEndpoint}`, data);
  }



  fillPlateWithItems(idPlate: number, plateDetailsUpdated: PlateModel) {
    const data = {
      patients: plateDetailsUpdated.patients,
      controls: plateDetailsUpdated.controls
    }
    return this.http.post(
      `${platesEndpoint}${idPlate}/fill`,
      data
    );
  }
}
