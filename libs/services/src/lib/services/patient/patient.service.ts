import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Patient } from '@ddsi-labs-apps/models';
import { AppRunningConfigService } from '../app-running-config/app-running-config.service';

const patientsEndpoint = `api/v1/patients`
@Injectable({
  providedIn: 'root'
})
export class PatientService {
  baseUrl = this.appConfig.getAppInputConfig()?.apiUrl;
  constructor(private http: HttpClient,private appConfig: AppRunningConfigService) { }

  uploadListPatientsWithFile(file?: any) {
    const formData = new FormData();
    formData.append('patients_list', file)
    return this.http.post(`${this.baseUrl}/${patientsEndpoint}/import/`, formData);
  }

  getListPatients(params: {limit: string, page: number, search?: string}) {
    let data: HttpParams = new HttpParams().append('p', params?.page + 1).append('size', params?.limit);
    if(params.search) {
      data = data.append('search', params.search);
    }
    return this.http.get<{results: Patient[], count: number}>(`${this.baseUrl}/${patientsEndpoint}/`, { params: data});
  }


  updatePatient(data: Patient) {
    return this.http.patch(`${this.baseUrl}/${patientsEndpoint}/${data.id}`, data);
  }

  deletePatient(data: Patient) {
    return this.http.delete(`${this.baseUrl}/${patientsEndpoint}/${data.id}`);
  }
  createPatient(data: Patient) {
    return this.http.post(`${this.baseUrl}/${patientsEndpoint}/`, data);
  }
}
