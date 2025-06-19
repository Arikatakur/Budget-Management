import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {}

  updateAverageIncome(userId: string, averageIncome: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${userId}/income`, { averageIncome });
  }

  getCurrentUser(): Observable<any> {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      return of(null);
    }
    return this.http.get(`${this.apiUrl}/${userId}`);
  }

  saveUserId(id: string): void {
    localStorage.setItem('userId', id);
  }

  getUserId(): string | null {
    return localStorage.getItem('userId');
  }
  getUserName(): Observable<string | null> {
    const userId = this.getUserId();
    if (!userId) {
      return of(null);
    }
    return this.http.get<any>(`${this.apiUrl}/${userId}`).pipe(
      switchMap(user => of(user?.name ?? null))
    );
  }
}
