import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Patient } from '@ddsi-labs-apps/models';
import { ENV_KEY } from '@ddsi-labs-apps/enums';

const BASE_URL = `${process.env[ENV_KEY.BASE_URL]}`;
const patientsEndpoint = `${BASE_URL}/api/v1/patients`
@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient) { }

  uploadListPatientsWithFile(file?: any) {
    const formData = new FormData();
    formData.append('patients_list', file)
    return this.http.post(`${patientsEndpoint}/import/`, formData);
  }

  getListPatients(params?: any) {
    const data: HttpParams = new HttpParams().append('p', params?.page + 1).append('size', params?.limit)
    return this.http.get<{results: Patient[], count: number}>(`${patientsEndpoint}/`, { params: data});
  }


  updatePatient(data: Patient) {
    return this.http.patch(`${patientsEndpoint}/${data.id}`, data);
  }

  deletePatient(data: Patient) {
    return this.http.delete(`${patientsEndpoint}/${data.id}`);
  }
  createPatient(data: Patient) {
    return this.http.post(`${patientsEndpoint}/`, data);
  }
}
