import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpStatusCode} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { ApplicationRoutingService, AuthenticationService, LocalStorageService, STORAGE_KEYS } from '../../services.module';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authService: AuthenticationService, private approuting: ApplicationRoutingService, private localStorage: LocalStorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle the error here
        if (
          error instanceof HttpErrorResponse && error.status === 401
        ) {
          return this.handle401Error(request, next);
        }
        return throwError(() => error);

      })
    )
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
        return this.authService.refreshAccessToken().pipe(
          switchMap(() => {            
            const access = this.localStorage.getFromLocalStorage(STORAGE_KEYS.AUTH_INFOS)?.access;
            request = request.clone({
              setHeaders: {
                Authorization: 'Bearer ' + access,
              },
            });
            return next.handle(request);
            
          }),
          catchError((error) => {

            if (error.status === HttpStatusCode.Unauthorized ) {
              this.authService.logout();
              this.approuting.goToLogin();
            }           
            return throwError(() => error);
          })
        );
      
    }
}
