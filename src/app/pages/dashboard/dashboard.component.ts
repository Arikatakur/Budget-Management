import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { format } from 'date-fns';
import { NgChartsModule } from 'ng2-charts';

import { TransactionService } from '../../services/transaction.service';  // :contentReference[oaicite:4]{index=4}
import { BalanceChartComponent } from './balance-chart/balance-chart.component';
import { User } from '../../core/models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgChartsModule, BalanceChartComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentMonthLabel = format(new Date(), 'MMMM yyyy');
  summary = { income: 0, expenses: 0, balance: 0};
  userName: string = '';
  averageIncome: number = 0;

  constructor(private txService: TransactionService,
    private userService: UserService ) {}

  ngOnInit(): void {
    this.userService.getCurrentUser()?.subscribe({
      next: (user) => {
        this.userName = user?.name || '';
        this.averageIncome = user?.averageIncome || 0;
      },
      error: (error) => {
        console.error('Error fetching user data:', error);
      }
    });

    this.txService.getSummary().subscribe(data => {
      this.summary = {
        income: data.income,
        expenses: data.expenses,
        balance: data.balance
      };
    });
  }
}
