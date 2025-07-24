import { Component, Input, OnChanges } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';

import { TransactionService } from '../../../services/transaction.service';
import { CategoryService } from '../../../services/category.service';
import { Transaction } from '../../../core/models/transaction.model';
import { Category } from '../../../core/models/category.model';

@Component({
  selector: 'app-monthly-report',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './monthly-report.component.html',
  styleUrls: ['./monthly-report.component.css']
})
export class MonthlyReportComponent implements OnChanges {
  @Input() selectedMonth: string = '';
  transactions: Transaction[] = [];
  categories: Category[] = [];
  categoryTotals: Record<string, number> = {};
  public Math = Math;

  chartData: ChartConfiguration<'bar'>['data'] = { labels: [], datasets: [] };
  chartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top', labels: { color: '#ffffff' } },
        
      title: { display: true, text: 'Expenses by Category', color: '#ffffff', font: { size: 14 }   }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: any) => '$' + value.toLocaleString(),
          color: '#bcbcbcff',
        }
      },
      x: {
        ticks: {
          color: '#bcbcbcff',
        }
      }
    }
  };

  constructor(
    private transactionService: TransactionService,
    private categoryService: CategoryService
  ) {}

  ngOnChanges(): void {
    if (!this.selectedMonth) return;

    const userId = localStorage.getItem('userId');
    if (!userId) return;

    this.categoryService.getCategories(userId).subscribe({
      next: (cats) => {
        this.categories = cats;

        this.transactionService.getTransactions().subscribe((data) => {
          const filtered = data.filter(t => t.date?.startsWith(this.selectedMonth));
          this.transactions = filtered;

          this.categoryTotals = filtered.reduce((acc, t) => {
            if (t.type === 'expense') {
              const categoryName = this.getCategoryName(t.categoryId);
              acc[categoryName] = (acc[categoryName] || 0) + Math.abs(t.amount);
            }
            return acc;
          }, {} as Record<string, number>);

          this.chartData = {
            labels: Object.keys(this.categoryTotals),
            datasets: [
              {
                label: 'Expenses by Category',
                data: Object.values(this.categoryTotals),
                backgroundColor: [
                  '#3B82F6', '#EF4444', '#10B981', '#F59E0B',
                  '#8B5CF6', '#06B6D4', '#F97316', '#84CC16'
                ]
              }
            ]
          };
        });
      },
      error: (err) => console.error('Failed to load categories:', err)
    });
  }

  getCategoryName(id: number | string | undefined): string {
    if (id === undefined || id === null) return 'Uncategorized';
    const category = this.categories.find(c => c.id == id);
    return category ? category.name : 'Uncategorized';
  }
}
