import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartData } from 'chart.js';
import { subMonths, format } from 'date-fns';
import { NgChartsModule } from 'ng2-charts';
import { TransactionService } from '../../../services/transaction.service';
import { CommonModule } from '@angular/common';

interface MonthData {
  key: string;
  label: string;
}

@Component({
  selector: 'app-balance-chart',
  standalone: true,
  imports: [NgChartsModule, CommonModule, NgChartsModule],
  templateUrl: './balance-chart.component.html',
  styleUrls: ['./balance-chart.component.css']
})
export class BalanceChartComponent implements OnInit {
  public chartData: ChartData<'line'> = { labels: [], datasets: [] };
  public chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { ticks: { color: '#ffffff' }, grid: { display: false } },
      y: { ticks: { color: '#ffffff' }, grid: { color: 'rgba(255,255,255,0.1)' } }
    },
    plugins: {
      legend: { labels: { color: '#ffffff' } }
    },
    elements: { line: { tension: 0.4 } }
  };

  constructor(private txService: TransactionService) {}

  ngOnInit(): void {
    this.txService.getTransactions().subscribe(transactions => {
      // Create last 7 months array
      const months: MonthData[] = Array.from({ length: 7 }).map((_, i) => {
        const date = subMonths(new Date(), 6 - i);
        return { key: format(date, 'yyyy-MM'), label: format(date, 'MMM yy') };
      });

      // Compute incomes and expenses arrays
      const incomes = months.map(m =>
        transactions
          .filter(t => t.type === 'income' && t.date.startsWith(m.key))
          .reduce((sum, t) => sum + t.amount, 0)
      );
      const expenses = months.map(m =>
        transactions
          .filter(t => t.type === 'expense' && t.date.startsWith(m.key))
          .reduce((sum, t) => sum + t.amount, 0)
      );

      // Set chart data
      this.chartData = {
        labels: months.map(m => m.label),
        datasets: [
          { label: 'Income', data: incomes, fill: true },
          { label: 'Expenses', data: expenses, fill: true }
        ]
      };
    });
  }
}
