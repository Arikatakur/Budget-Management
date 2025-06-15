import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../core/services/transaction.service';
import { UserService } from '../../core/services/user.service';
import { NgChartsModule } from 'ng2-charts';
import { ChartType, ChartData } from 'chart.js';
import { CommonModule } from '@angular/common';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgChartsModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userName = 'Saleem';
  averageIncome: number = 0;
  income = 0;
  expenses = 0;
  balance = 0;

  public pieChartType: ChartType = 'pie';

  public pieChartData: ChartData<'pie'> = {
    labels: ['Income', 'Expenses'],
    datasets: [
      {
        data: [0, 0],
        backgroundColor: ['#36A2EB', '#FF6384']
      }
    ]
  };

  constructor(
    private transactionService: TransactionService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.transactionService.getTransactions().subscribe((transactions: any[]) => {
      const now = new Date();
      const thisMonthTxns = transactions.filter(txn => {
        const d = new Date(txn.date);
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
      });

      this.income = thisMonthTxns
        .filter(t => t.amount > 0)
        .reduce((sum, t) => sum + t.amount, 0);

      this.expenses = thisMonthTxns
        .filter(t => t.amount < 0)
        .reduce((sum, t) => sum + Math.abs(t.amount), 0);

      this.balance = this.income - this.expenses;

      this.pieChartData.datasets[0].data = [this.income, this.expenses];
    });

    this.userService.getCurrentUser().subscribe({
      next: (user) => {
        this.averageIncome = user.averageIncome;
      },
      error: (err) => {
        console.error('Failed to fetch user income', err);
      }
    });
  }
}
