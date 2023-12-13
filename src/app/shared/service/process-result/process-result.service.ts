import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ENV_KEY } from '@ddsi-labs-apps/enums';

const BASE_URL = `${process.env[ENV_KEY.BASE_URL]}`;
const processEndpoint = `${BASE_URL}/api/v1/plate-types/`

@Injectable({
  providedIn: 'root'
})
export class ProcessResultService {

  constructor(private http: HttpClient) { }

  getProcessResult(files: FormData) {
    return this.http.post(`${processEndpoint}`, files);
  }
}
