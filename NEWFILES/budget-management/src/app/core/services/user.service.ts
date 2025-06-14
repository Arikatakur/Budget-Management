import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  return this.http.get(`${this.apiUrl}/me`);
}
}
