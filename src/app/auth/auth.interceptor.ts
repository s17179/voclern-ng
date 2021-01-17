import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private token?: string;

  constructor(private authService: AuthService) {
    authService.token.subscribe(token => {
      this.token = token;
    });
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.token !== undefined) {
      const request = req.clone({
        headers: req.headers.append('Authorization', this.token)
      });

      return next.handle(request);
    }

    return next.handle(req);
  }
}
