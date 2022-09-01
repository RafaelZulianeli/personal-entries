import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SessionService } from '../services/session.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private sessionService: SessionService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authHeader = this.sessionService.getToken();

    if (authHeader) {
      const authReq = req.clone({
        setHeaders: {
          Authorization: authHeader,
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      return next.handle(authReq).pipe(this.handleErrors);
    }

    return next.handle(req).pipe(this.handleErrors);
  }

  handleErrors(source: Observable<HttpEvent<any>>): Observable<HttpEvent<any>> {
    return source.pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return EMPTY;
      })
    );
  }
}
