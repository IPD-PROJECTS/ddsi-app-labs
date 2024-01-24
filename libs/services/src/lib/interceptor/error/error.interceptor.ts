import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpStatusCode} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { ApplicationRoutingService, AuthenticationService } from '../../services.module';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authService: AuthenticationService, private approuting: ApplicationRoutingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle the error here
        console.error('HTTP Error:', error);
        if(error.status === HttpStatusCode.Unauthorized) {
          return this.refreshTokenMethod(request, next)
        }
        return throwError(error);

      })
    )
  }

  refreshTokenMethod(
    request: HttpRequest<any>,
    next: HttpHandler
  ) {
    return this.authService.refreshAccessToken().pipe(
      catchError((error) => {
        //Refresh Token Issue.
        if (error.status === HttpStatusCode.Unauthorized ) {
          this.authService.logout();
          this.approuting.goToLogin();
        }
        return throwError(error);
      }
      ),
      switchMap((res) => {
        request = request.clone({
          setHeaders: {
            Authorization: 'Bearer ' + res?.body.access,
          },
        });
        return next.handle(request);
      })
    );
  }
}
