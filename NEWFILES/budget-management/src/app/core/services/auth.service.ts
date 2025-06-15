import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

const AUTH_API_URL = 'http://localhost:3000/api/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${AUTH_API_URL}/login`, credentials).pipe(
      tap(response => this.saveUserIdFromResponse(response))
    );
  }

  register(data: {
    name: string;
    email: string;
    password: string;
    phone?: string;
  }): Observable<any> {
    return this.http.post(`${AUTH_API_URL}/register`, data).pipe(
      tap(response => this.saveUserIdFromResponse(response))
    );
  }

  private saveUserIdFromResponse(response: any): void {
    if (response && response.user && response.user.id) {
      localStorage.setItem('userId', response.user.id);
    }
  }
}
