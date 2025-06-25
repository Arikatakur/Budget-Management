import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { TransactionService } from '../../services/transaction.service';
import { CategoryService } from '../../services/category.service';
import { Transaction } from '../../core/models/transaction.model';
import { Category } from '../../core/models/category.model';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  transactions: Transaction[] = [];
  categories: Category[] = [];

  newTransaction: Partial<Transaction> = {
    type: 'income',
    amount: 0,
    description: '',
    date: this.getTodayDate(),
    categoryId: undefined
  };

  // New properties for adding category
  showAddCategoryInput: boolean = false;
  newCategoryName: string = '';

  constructor(
    private transactionService: TransactionService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loadTransactions();
    this.loadCategories();
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

  loadCategories(): void {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    this.categoryService.getCategories(userId).subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => console.error('Failed to load categories:', err)
    });
  }

  addTransaction(): void {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    const { amount, type, date, categoryId } = this.newTransaction;
    if (!amount || !type || !date || !categoryId) {
      alert('Please fill in all required fields, including category.');
      return;
    }

    const transaction: Transaction = {
      ...this.newTransaction,
      userId,
    } as Transaction;

    this.transactionService.createTransaction(transaction).subscribe({
      next: () => {
        this.loadTransactions();
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
      date: this.getTodayDate(),
      categoryId: undefined
    };
  }

  deleteTransaction(id: string): void {
    if (!id) return;

    this.transactionService.deleteTransaction(id).subscribe({
      next: () => this.loadTransactions(),
      error: (err) => console.error('Failed to delete transaction:', err)
    });
  }

  getCategoryName(id: number | string | undefined): string {
    if (id === undefined || id === null) return 'N/A';

    const category = this.categories.find(c => c.id == id);

    return category ? category.name : 'Unknown';
  }

  toggleAddCategory(): void {
    this.showAddCategoryInput = !this.showAddCategoryInput;
    this.newCategoryName = '';
  }

  addNewCategory(): void {
    const userId = localStorage.getItem('userId');
    if (!userId || !this.newCategoryName.trim()) {
      alert('Please enter a category name.');
      return;
    }

    const newCategory: Partial<Category> = {
      name: this.newCategoryName.trim(),
      userId: userId 
    };

    this.categoryService.createCategory(newCategory as Category).subscribe({
      next: (createdCategory) => {
        this.categories.push(createdCategory);
        this.newTransaction.categoryId = createdCategory.id;
        this.newCategoryName = ''; 
        this.showAddCategoryInput = false; 
      },
      error: (err) => console.error('Failed to add category:', err)
    });
  }
}