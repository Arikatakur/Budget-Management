import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

// The base URL for authentication routes is '/api/auth'
const AUTH_API_URL = 'http://localhost:3000/api/auth'; 

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  /**
   * Logs in a user.
   * On success, it calls saveUserId() to store the user's ID.
   */
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${AUTH_API_URL}/login`, credentials).pipe(
      tap(response => this.saveUserIdFromResponse(response))
    );
  }

  /**
   * Registers a new user.
   * On success, it calls saveUserId() to store the new user's ID.
   */
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

  /**
   * A helper function to get the user object from the response and save the ID.
   */
  private saveUserIdFromResponse(response: any): void {
    // Our backend sends back a 'user' object inside the response on login/register
    if (response && response.user && response.user.id) {
      this.saveUserId(response.user.id);
    }
  }

  /**
   * Saves the user's ID to localStorage. This is our new way of "remembering" the user.
   */
  saveUserId(userId: string) {
    localStorage.setItem('userId', userId);
  }

  /**
   * Retrieves the saved user ID from localStorage.
   */
  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  /**
   * Logs the user out by removing their ID from localStorage.
   */
  logout() {
    localStorage.removeItem('userId');
    // You might want to navigate the user to the login page here
    // For example: this.router.navigate(['/login']);
  }

  /**
   * Checks if a user is "logged in" by seeing if a userId is saved.
   */
  isLoggedIn(): boolean {
    return !!this.getUserId();
  }
}
