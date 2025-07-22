import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ReprortsDataService {
  private transactions = [
    {
      id: 1,
      date: '2025-07-01',
      description: 'Groceries',
      category: 'Food',
      amount: -150,
      type: 'expense'
    },
    {
      id: 2,
      date: '2025-07-05',
      description: 'Salary',
      category: 'Income',
      amount: 3000,
      type: 'income'
    },
    {
      id: 3,
      date: '2025-07-10',
      description: 'Utilities',
      category: 'Bills',
      amount: -120,
      type: 'expense'
    },
    // Add more mock data if needed
  ];

  getTransactions(): any[] {
    return this.transactions;
  }

  getMonthlyData(month: string): { income: number, expenses: number } {
    const monthlyTransactions = this.transactions.filter(t => t.date.startsWith(month));
    const income = monthlyTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    const expenses = monthlyTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);
    return { income, expenses };
  }

  getCategoryData(): Record<string, number> {
    const result: Record<string, number> = {};
    for (const t of this.transactions) {
      if (t.type === 'expense') {
        result[t.category] = (result[t.category] || 0) + Math.abs(t.amount);
      }
    }
    return result;
  }
}
