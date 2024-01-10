import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENV_KEY } from '@ddsi-labs-apps/enums';
import { tap } from 'rxjs';
import { LocalStorageService, STORAGE_KEYS } from '../local-storage/local-storage.service';

const BASE_URL = `${process.env[ENV_KEY.BASE_URL]}`;
const authEndpoint = `${BASE_URL}/api/token/`

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private localStorage: LocalStorageService) { }

  login(data: {username: string, passsword: string}) {
    return this.http.post(`${authEndpoint}`, data).pipe(
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
}
