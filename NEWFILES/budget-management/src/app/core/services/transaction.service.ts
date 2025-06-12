import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Transaction } from '../models/transaction.model';

const MOCK_TRANSACTIONS: Transaction[] = [
  { transaction_id: '1', user_id: '123', description: 'Groceries', date: '2024-10-01', amount: -75.50, category: 'Food' },
  { transaction_id: '2', user_id: '123', description: 'Salary', date: '2024-10-01', amount: 3000, category: 'Income' }
];

@Injectable({
  providedIn: 'root' // Provided once in the whole app
})
export class TransactionService {
  getTransactions(userId: string): Observable<Transaction[]> {
    // Later, this will be an HttpClient call
    return of(MOCK_TRANSACTIONS);
  }
}