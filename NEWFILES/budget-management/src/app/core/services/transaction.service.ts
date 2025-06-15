import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs'; // Import 'of' for handling cases where there's no user ID
import { Transaction } from '../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = 'http://localhost:3000/api/transactions';

  constructor(private http: HttpClient) {}

  /**
   * Fetches all transactions for the currently logged-in user.
   */
  getTransactions(): Observable<Transaction[]> {
    // 1. Get the user ID that was saved in localStorage during login.
    const userId = localStorage.getItem('userId');

    // 2. If there's no user ID, the user isn't logged in. We can't fetch data.
    if (!userId) {
      console.error('User ID not found in localStorage. Please log in.');
      // Return an empty array to prevent the application from crashing.
      return of([]); 
    }
    
    // 3. Append the userId as a query parameter to the URL.
    // This creates a URL like: http://localhost:3000/api/transactions?userId=123
    const urlWithUserId = `${this.apiUrl}?userId=${userId}`;

    // 4. Make the HTTP GET request. No headers are needed.
    return this.http.get<Transaction[]>(urlWithUserId);
  }

  // --- You will also need to update other methods like createTransaction ---

  /**
   * Creates a new transaction for the current user.
   */
  createTransaction(transactionData: Omit<Transaction, 'id'>): Observable<Transaction> {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('Cannot create transaction without a userId.');
      // In a real app, you might throw an error or handle this more gracefully.
      return new Observable(observer => observer.error('User not logged in'));
    }

    // Add the user's ID to the transaction data before sending it.
    const dataToSend = {
      ...transactionData,
      userId: userId 
    };

    return this.http.post<Transaction>(this.apiUrl, dataToSend);
  }
}
