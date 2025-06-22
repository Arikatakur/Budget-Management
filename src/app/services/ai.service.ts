import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AiService {
  private apiUrl = `${environment.apiUrl}/suggestions`;

  constructor(private http: HttpClient) { }

  generateSuggestion(prompt: string, userId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/generate`, { prompt, userId });
  }

  getSuggestionHistory(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?userId=${userId}`);
  }
}
