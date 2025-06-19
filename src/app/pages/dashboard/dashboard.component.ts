import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { UserService } from '../../services/user.service';
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
  userName: string = '';
  averageIncome: number = 0;
  income = 0;
  expenses = 0;
  balance = 0;

  public pieChartType: ChartType = 'pie';

  public chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: <const>'bottom'
    }
  }
};

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
  ) { }

  ngOnInit(): void {
    this.transactionService.getSummary().subscribe((summary) => {
      this.income = summary.income;
      this.expenses = summary.expenses;
      this.balance = summary.balance;
      this.pieChartData.datasets[0].data = [this.income, this.expenses];
    });
    


    this.userService.getCurrentUser().subscribe({
      next: (user) => {
        this.userName = user?.name || '';
        this.averageIncome = user?.averageIncome || 0;
      },
      error: (err) => {
        console.error('Failed to fetch user info', err);
      }
    });
  }
}

