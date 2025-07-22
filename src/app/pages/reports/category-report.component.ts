import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-category-report',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './category-report.component.html',
  styleUrls: ['./category-report.component.css']
})

export class CategoryReportComponent implements OnInit {
  transactions: any[] = [];
  categoryData: Record<string, number> = {};
  sortedCategoryData: { key: string; value: number }[] = [];
  totalExpenses = 0;
  public Math = Math;

  chartData: ChartConfiguration<'pie'>['data'] = { labels: [], datasets: [] };
  chartOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'right',
        labels: {
          color: '#ffffff', // gray-900
          font: {
            size: 14,
          },
        },
       },
    }
  };

  colors: string[] = [
    '#3B82F6', '#EF4444', '#10B981', '#F59E0B',
    '#8B5CF6', '#06B6D4', '#F97316', '#84CC16', '#EC4899', '#6366F1'
  ];

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.transactionService.getTransactions().subscribe(data => {
      this.transactions = data.filter(t => t.type === 'expense');

      this.categoryData = this.transactions.reduce((acc, t) => {
        const cat =
          typeof t.category === 'object' ? t.category?.name :
          t.category || 'Uncategorized';

        acc[cat] = (acc[cat] || 0) + Math.abs(t.amount);
        return acc;
      }, {} as Record<string, number>);

      this.totalExpenses = Object.values(this.categoryData).reduce((a, b) => a + b, 0);

      this.sortedCategoryData = Object.entries(this.categoryData)
        .map(([key, value]) => ({ key, value }))
        .sort((a, b) => b.value - a.value);

      const labels = Object.keys(this.categoryData);
      const dataValues = Object.values(this.categoryData);

      // Assign color per label
      const backgroundColors = labels.map(label => {
        if (label === 'Uncategorized') return '#9CA3AF'; // gray for Uncategorized
        const index = labels.indexOf(label);
        return this.colors[index % this.colors.length];
      });

      this.chartData = {
        labels,
        datasets: [
          {
            data: dataValues,
            backgroundColor: backgroundColors,
            borderColor: backgroundColors,
            borderWidth: 2,
          }
        ]
      };

    });
  }

  countTransactions(category: string): number {
    return this.transactions.filter(t => {
      const cat =
        typeof t.category === 'object' ? t.category?.name :
        t.category || 'Uncategorized';
      return cat === category;
    }).length;
  }
}
