import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, tap } from 'rxjs';
import { PlateModel } from '@ddsi-labs-apps/models';
import { ENV_KEY, FORMAT } from '@ddsi-labs-apps/enums';

const BASE_URL = `${process.env[ENV_KEY.BASE_URL]}`;
const platesEndpoint = `${BASE_URL}/api/v1/plates/`;



@Injectable({
  providedIn: 'root',
})
export class PlatePlanService {
  constructor(
    private http: HttpClient
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

  uploadRoboAnalysisResult(id: any, file: File) {
    const formData = new FormData();
    formData.append('excel_spectro_file', file)
    return this.http.patch(`${platesEndpoint}${id}`, formData);
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

  getRobotProcessResult(idPlate: number, type: FORMAT) {
    const headers = new HttpHeaders().set('Content-type', type);;
    return this.http.get(
      `${platesEndpoint}${idPlate}/process`, {headers, responseType: 'blob' as 'json'}
    ).pipe(
      tap((blob: any) => {
          if(type !== FORMAT.JSON) {
            const extension = this.getFileExtension(type);
            const fileName = `process_result_plate_${idPlate}.${extension}`;
            this.downloadAsFile(blob, type, fileName );
          }
      })
    );
  }

  getFileExtension(type: FORMAT) {
    switch (type) {
      case FORMAT.EXCEL:
        return 'xlsx';
      case FORMAT.PNG:
        return 'png';
      case FORMAT.ZIP:
        return 'zip';
      default:
        break;
    }
    return
  }

  public downloadAsFile(blob: any, type: FORMAT, fileName: string) {
     const link = document.createElement('a');
     link.href = window.URL.createObjectURL(blob);
     link.download = fileName;
     document.body.appendChild(link);
     link.click();
     document.body.removeChild(link);
 }

  uploadPlatePlan(idPlate: number,file: File) {
    const formData = new FormData();
    formData.append('plate_file', file);
    return this.http.post(`${platesEndpoint}${idPlate}/import/`, formData)
  }
}
