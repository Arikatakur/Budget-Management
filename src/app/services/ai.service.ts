import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
const AUTH_API_URL = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root'
})
export class AiService {
  private apiUrl = `${AUTH_API_URL}/suggestions`;

  constructor(private http: HttpClient) { }

  generateSuggestion(prompt: string, userId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/generate`, { prompt, userId });
  }

  getSuggestionHistory(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?userId=${userId}`);
  }
}
