import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpStatusCode
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { ApplicationRoutingService, AuthenticationService } from '../../services.module';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private approuting: ApplicationRoutingService, private authService: AuthenticationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle the error here
        console.error('HTTP Error:', error);
        if(error.status === HttpStatusCode.Unauthorized) {
          this.authService.logout();
          this.approuting.goToLogin();
        }
        return throwError(error);
      })
    )
  }
}
