import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppRunningConfigService } from '../app-running-config/app-running-config.service';

const processEndpoint = `api/v1/plate-types/`

@Injectable({
  providedIn: 'root'
})
export class ProcessResultService {
baseUrl = this.appConfig.getAppInputConfig()?.apiUrl;
  constructor(private http: HttpClient,private appConfig: AppRunningConfigService) { }

  getProcessResult(files: FormData) {
    return this.http.post(`${this.baseUrl}/${processEndpoint}`, files);
  }
}
