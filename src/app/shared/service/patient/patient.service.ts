import { Injectable } from '@angular/core';
import { ENV_KEY } from '../../util';
import { HttpClient } from '@angular/common/http';
import { Patient } from 'src/app/models/patient.model';

const BASE_URL = `${process.env[ENV_KEY.BASE_URL]}`;
const patientsEndpoint = `${BASE_URL}/patients`
@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient) { }

  getListPatients(params?: any) {
    return this.http.get<Patient[]>(`${patientsEndpoint}`);
  }


  updatePatient(data: Patient) {
    return this.http.put(`${patientsEndpoint}/${data.id}`, data);
  }

  deletePatient(data: Patient) {
    return this.http.delete(`${patientsEndpoint}/${data.id}`);
  }
  createPatient(data: Patient) {
    return this.http.post(`${patientsEndpoint}`, data);
  }
}
