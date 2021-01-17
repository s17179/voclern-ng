import {LoginResponse} from './login.response';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {
  token = new BehaviorSubject<string | undefined>(undefined);

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  isAuthenticated(): boolean {
    const token = this.token.getValue();

    return !!token;
  }

  loginWithLocalStorage(): void {
    const token = localStorage.getItem('token');

    if (token) {
      this.token.next(token);
    }
  }

  login(email: string, password: string): void {
    this.httpClient.post<LoginResponse>(
      'http://localhost:8080/api/login',
      {email, password}
    ).subscribe((response) => {
      this.token.next(response.token);
      localStorage.setItem('token', response.token);
    }, error => {
    }, () => {
      this.router.navigate(['/']);
    });
  }

  logout(): void {
    this.token.next(undefined);
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
