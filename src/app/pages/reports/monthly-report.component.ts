import { Component, Input, OnChanges } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-monthly-report',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './monthly-report.component.html',
  styleUrls: ['./monthly-report.component.css']
})
export class MonthlyReportComponent implements OnChanges {
  @Input() selectedMonth: string = '';
  transactions: any[] = [];
  categoryTotals: Record<string, number> = {};
  public Math = Math;

  chartData: ChartConfiguration<'bar'>['data'] = { labels: [], datasets: [] };
  chartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Expenses by Category' }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: any) => '$' + value.toLocaleString()
        }
      }
    }
  };

  constructor(private transactionService: TransactionService) {}

  ngOnChanges(): void {
    if (!this.selectedMonth) return;

    this.transactionService.getTransactions().subscribe((data) => {
      const filtered = data.filter(t => t.date?.startsWith(this.selectedMonth));
      this.transactions = filtered;

      // Compute category totals
      this.categoryTotals = filtered.reduce((acc, t) => {
        if (t.type === 'expense') {
          const categoryName = typeof t.category === 'object' ? t.category?.name : t.category;
          acc[categoryName] = (acc[categoryName] || 0) + Math.abs(t.amount);
        }
        return acc;
      }, {} as Record<string, number>);

      // Set chart data
      this.chartData = {
        labels: Object.keys(this.categoryTotals),
        datasets: [
          {
            label: 'Expenses by Category',
            data: Object.values(this.categoryTotals),
            backgroundColor: [
              '#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6',
              '#06B6D4', '#F97316', '#84CC16'
            ]
          }
        ]
      };
    });
  }
}
