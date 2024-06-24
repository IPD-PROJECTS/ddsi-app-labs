import { HttpInterceptorFn } from '@angular/common/http';
import { throwError, timeout } from 'rxjs';

export const timeOutInterceptor: HttpInterceptorFn = (req, next) => {
  
  return next(req).pipe(timeout({
    each: 5000
  }));
};
