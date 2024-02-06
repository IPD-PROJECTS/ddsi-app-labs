import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, tap } from 'rxjs';
import { PlateModel, PlateRequestModel, PlateTypeTestModel } from '@ddsi-labs-apps/models';
import { CONTROLS, FORMAT } from '@ddsi-labs-apps/enums';
import { AppRunningConfigService } from '../app-running-config/app-running-config.service';

const platesEndpoint = `api/v1/plates/`;
const platesTestEndpoint = `api/v1/test-types/`;



@Injectable({
  providedIn: 'root',
})
export class PlatePlanService {
  baseUrl = this.appConfig.getAppInputConfig()?.apiUrl;
  constructor(
    private http: HttpClient,
    private appConfig: AppRunningConfigService
  ) {
  }

  getListPlates(params?: {limit: string, page: number, search?: string}) {
    let data: HttpParams = params
      ? new HttpParams()
          .append('p', params?.page + 1)
          .append('size', params?.limit)
      : new HttpParams();
    if(params?.search) {
      data = data.append('search', params.search);
    }
    return this.http.get<{ results: PlateModel[]; count: number }>(
      `${this.baseUrl}/${platesEndpoint}`,
      { params: data }
    );
  }

  getPlatesTestList() {
    return this.http.get<PlateTypeTestModel[]>(`${this.baseUrl}/${platesTestEndpoint}`);
  }

  uploadRoboAnalysisResult(id: any, file: File) {
    const formData = new FormData();
    formData.append('excel_spectro_file', file)
    return this.http.patch(`${this.baseUrl}/${platesEndpoint}${id}`, formData);
  }

  updatePlate(data: PlateRequestModel) {
    return this.http.patch(`${this.baseUrl}/${platesEndpoint}${data.id}`, data);
  }

  getPlateTypeDetailsById(id: string | null) {
    if (id) {
      return this.http.get(`${this.baseUrl}/${platesTestEndpoint}${id}`);
    }
    return of();
  }

  getPlateDetailsById(id: string | null) {
    if (id) {
      return this.http.get(`${this.baseUrl}/${platesEndpoint}${id}`);
    }
    return of({});
  }

  deletePlate(data: PlateModel) {
    return this.http.delete(`${this.baseUrl}/${platesEndpoint}${data.id}`);
  }

  createPlate(data: PlateRequestModel) {
    return this.http.post(`${this.baseUrl}/${platesEndpoint}`, data);
  }



  fillPlateWithItems(idPlate: number, plateDetailsUpdated: PlateModel) {
    const data = {
      patients: plateDetailsUpdated.patients,
      controls: plateDetailsUpdated.controls
    }
    return this.http.post(
      `${this.baseUrl}/${platesEndpoint}${idPlate}/fill`,
      data
    );
  }

  getRobotProcessResult(idPlate: number, type: FORMAT) {
    const headers = new HttpHeaders().set('Content-type', type);
    return this.http.get(
      `${this.baseUrl}/${platesEndpoint}${idPlate}/process`, {headers, responseType: type !== FORMAT.JSON ? 'blob' as 'json' : 'json'}
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
    return this.http.post(`${this.baseUrl}/${platesEndpoint}${idPlate}/import/`, formData)
  }

  checkPlatePlanValidity(plate: PlateModel): boolean {
    let isValid = false;
    const number_pos = plate.controls?.filter((elt) => elt.control_name === CONTROLS.POS).length;
    const number_neg = plate.controls?.filter((elt) => elt.control_name === CONTROLS.NEG).length;
    const number_whites = plate.controls?.filter((elt) => elt.control_name === CONTROLS.WHITE).length;
    if(plate.test?.number_of_negatives === number_neg && plate.test?.number_of_positives === number_pos && plate.test?.number_of_whites === number_whites) {
      isValid = true;
    }
    return isValid;
  }
}
