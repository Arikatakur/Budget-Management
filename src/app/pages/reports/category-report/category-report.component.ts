import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { TransactionService } from '../../../services/transaction.service';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../core/models/category.model';

@Component({
  selector: 'app-category-report',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './category-report.component.html',
  styleUrls: ['./category-report.component.css']
})
export class CategoryReportComponent implements OnChanges {
  @Input() month: string = '';

  transactions: any[] = [];
  categoryData: Record<string, number> = {};
  categories: Category[] = [];
  categoryMap: Record<string, string> = {};
  sortedCategoryData: { key: string; value: number }[] = [];
  totalExpenses = 0;
  public Math = Math;

  chartData: ChartConfiguration<'pie'>['data'] = { labels: [], datasets: [] };
  chartOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: '#ffffff',
          font: { size: 14 }
        }
      }
    }
  };

  colors: string[] = [
    '#3B82F6', '#EF4444', '#10B981', '#F59E0B',
    '#8B5CF6', '#06B6D4', '#F97316', '#84CC16', '#EC4899', '#6366F1'
  ];

  constructor(
    private transactionService: TransactionService,
    private categoryService: CategoryService
  ) {}

  ngOnChanges(): void {
    if (!this.month) return;

    const userId = localStorage.getItem('userId');
    if (!userId) return;

    this.categoryService.getCategories(userId).subscribe(categories => {
      this.categories = categories;
      this.categoryMap = Object.fromEntries(categories.map(c => [c.id, c.name]));

      this.transactionService.getTransactions().subscribe(data => {
        this.transactions = data.filter(t => t.type === 'expense' && t.date?.startsWith(this.month));

        this.categoryData = this.transactions.reduce((acc, t) => {
          const catName = typeof t.category === 'object'
            ? t.category?.name
            : this.categoryMap[t.categoryId!] || 'Uncategorized';
          acc[catName] = (acc[catName] || 0) + Math.abs(t.amount);
          return acc;
        }, {} as Record<string, number>);

        this.totalExpenses = Object.values(this.categoryData).reduce((a, b) => a + b, 0);

        this.sortedCategoryData = Object.entries(this.categoryData)
          .map(([key, value]) => ({ key, value }))
          .sort((a, b) => b.value - a.value);

        const labels = Object.keys(this.categoryData);
        const dataValues = Object.values(this.categoryData);
        const backgroundColors = labels.map((_, i) => this.colors[i % this.colors.length]);

        this.chartData = {
          labels,
          datasets: [{
            data: dataValues,
            backgroundColor: backgroundColors,
            borderColor: backgroundColors,
            borderWidth: 2,
            hoverOffset: 0,
            hoverBorderColor: backgroundColors,
            hoverBackgroundColor: backgroundColors,
          }]
        };
      });
    });
  }

  countTransactions(categoryName: string): number {
    return this.transactions.filter(t => {
      const catName = typeof t.category === 'object'
        ? t.category?.name
        : this.categoryMap[t.categoryId!] || 'Uncategorized';
      return catName === categoryName;
    }).length;
  }
}