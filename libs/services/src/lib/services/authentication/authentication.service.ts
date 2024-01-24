import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { LocalStorageService, STORAGE_KEYS } from '../local-storage/local-storage.service';
import { AppRunningConfigService } from '../app-running-config/app-running-config.service';
import { Observable } from 'rxjs';

const authEndpoint = `api/token/`

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  baseUrl = this.appConfig.getAppInputConfig()?.apiUrl;
  constructor(private http: HttpClient, private localStorage: LocalStorageService,  private appConfig: AppRunningConfigService) { }

  login(data: {username: string, passsword: string}) {
    return this.http.post(`${this.baseUrl}/${authEndpoint}`, data).pipe(
      tap((res) => {
        this.localStorage.saveToLocalStorage(STORAGE_KEYS.AUTH_INFOS, res)
        this.localStorage.saveToLocalStorage(STORAGE_KEYS.USERNAME, data.username)
      })
    )
  }

  logout() {
    this.localStorage.deleteKeyFromLocalStorage(STORAGE_KEYS.AUTH_INFOS);
    this.localStorage.deleteKeyFromLocalStorage(STORAGE_KEYS.USERNAME);
  }



  refreshAccessToken() {
    const data = this.localStorage.getFromLocalStorage(STORAGE_KEYS.AUTH_INFOS);

    return this.http.post(`${this.baseUrl}/${authEndpoint}refresh/`, { refresh: data?.refresh }, {observe :'response'}).pipe(
     tap((res: any) => {
      this.localStorage.saveToLocalStorage(STORAGE_KEYS.AUTH_INFOS, { ...data, access: res.body?.access });
     })
    )
  }
}