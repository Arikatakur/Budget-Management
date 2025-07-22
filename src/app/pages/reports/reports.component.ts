import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { format, subMonths, endOfMonth } from 'date-fns';
import { ReprortsDataService } from '../../services/reports.service';
import { MonthlyReportComponent } from './monthly-report.component';
import { CategoryReportComponent } from './category-report.component';


@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MonthlyReportComponent,
    CategoryReportComponent,
  ],
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})

export class ReportsComponent implements OnInit {
  selectedMonth: string = format(new Date(), 'yyyy-MM');
  reportType: string = 'monthly';
  months: string[] = [];

  monthlyData = { income: 0, expenses: 0 };
  categoryData: Record<string, number> = {};
  transactions: any[] = [];

  constructor(private ReportsService: ReprortsDataService) {}

  ngOnInit(): void {
    this.generateMonthList();
    this.loadData();
  }

  generateMonthList(): void {
    for (let i = 0; i < 12; i++) {
      const month = format(subMonths(new Date(), i), 'yyyy-MM');
      this.months.push(month);
    }
  }

  loadData(): void {
    this.monthlyData = this.ReportsService.getMonthlyData(this.selectedMonth);
    this.categoryData = this.ReportsService.getCategoryData();
    this.transactions = this.ReportsService.getTransactions();
  }

  onMonthChange(): void {
    this.loadData();
  }

  exportToPDF(): void {
    const reportData = {
      month: this.selectedMonth,
      income: this.monthlyData.income,
      expenses: this.monthlyData.expenses,
      balance: this.monthlyData.income - this.monthlyData.expenses,
      categories: this.categoryData
    };

    const dataStr = JSON.stringify(reportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = `financial-report-${this.selectedMonth}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }

  exportToCSV(): void {
    const csvData = [
      ['Date', 'Description', 'Category', 'Amount', 'Type'],
      ...this.transactions.map(t => [
        t.date,
        t.description,
        t.category,
        t.amount,
        t.type
      ])
    ];

    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const dataUri = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent);

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', `transactions-${this.selectedMonth}.csv`);
    linkElement.click();
  }

  getReportPeriod(): string {
    const start = format(new Date(this.selectedMonth + '-01'), 'MMM d');
    const end = format(endOfMonth(new Date(this.selectedMonth + '-01')), 'MMM d, yyyy');
    return `${start} - ${end}`;
  }

  getNetSavings(): number {
    return this.monthlyData.income - this.monthlyData.expenses;
  }

  isSavingsPositive(): boolean {
    return this.getNetSavings() >= 0;
  }
}
