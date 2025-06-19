import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../core/models/transaction.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})

export class TransactionsComponent implements OnInit {
  transactions: Transaction[] = [];

  newTransaction: Partial<Transaction> = {
    type: 'income',
    amount: 0,
    description: '',
    date: this.getTodayDate()
  };

  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.loadTransactions();
  }

  getTodayDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  loadTransactions(): void {
    this.transactionService.getTransactions().subscribe({
      next: (data) => (this.transactions = data),
      error: (err) => console.error('Failed to load transactions:', err)
    });
  }

  addTransaction(): void {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    const { amount, type, date } = this.newTransaction;
    if (!amount || !type || !date) {
      alert('Please fill in all required fields.');
      return;
    }

    const transaction: Transaction = {
      ...this.newTransaction,
      userId,
    } as Transaction;

    this.transactionService.createTransaction(transaction).subscribe({
      next: () => {
        this.loadTransactions(); // reload list
        this.resetForm();
      },
      error: (err) => console.error('Failed to add transaction:', err)
    });
  }

  resetForm(): void {
    this.newTransaction = {
      type: 'income',
      amount: 0,
      description: '',
      date: this.getTodayDate()
    };
  }
  deleteTransaction(id: string): void {
    this.transactionService.deleteTransaction(id).subscribe({
      next: () => this.loadTransactions(),
      error: (err) => alert('Failed to delete transaction.')
    });
  }
}
