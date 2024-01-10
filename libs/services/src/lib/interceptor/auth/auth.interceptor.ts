import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService, STORAGE_KEYS } from '../../services.module';
import { LoginResponse } from '@ddsi-labs-apps/models';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private storage: LocalStorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authInfos: LoginResponse = this.storage.getFromLocalStorage(STORAGE_KEYS.AUTH_INFOS);
    const authRequest = request.clone({
      setHeaders: { Authorization:  `Bearer ${authInfos?.access}`}
    });
    return next.handle(authRequest);
  }
}
