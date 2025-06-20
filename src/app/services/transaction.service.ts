import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = 'http://localhost:3000/api/transactions';

  constructor(private http: HttpClient) { }

  getTransactions(): Observable<any[]> {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      return of([]);
    }
    const urlWithUserId = `${this.apiUrl}?userId=${userId}`;
    return this.http.get<any[]>(urlWithUserId);
  }

  createTransaction(transaction: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, transaction);
  }

  updateTransaction(id: string, transaction: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, transaction);
  }
  getSummary(): Observable<any> {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      return of({ income: 0, expenses: 0, balance: 0 });
    }
    return this.http.get<any>(`${this.apiUrl}/summary?userId=${userId}`);
  }

  deleteTransaction(id: string): Observable<any> {
    const userId = localStorage.getItem('userId');
    return this.http.delete(`${this.apiUrl}/${id}?userId=${userId}`);
  }
}
