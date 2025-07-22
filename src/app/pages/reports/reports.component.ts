import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { format, subMonths, endOfMonth } from 'date-fns';
import { TransactionService } from '../../services/transaction.service';
import { MonthlyReportComponent } from './monthly-report.component';
import { CategoryReportComponent } from './category-report.component';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';



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

constructor(private transactionService: TransactionService) {}

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
  const userId = localStorage.getItem('userId');
  if (!userId) return;

  this.transactionService.getTransactions().subscribe((data) => {
    this.transactions = data.filter(t => t.date?.startsWith(this.selectedMonth));

    // Calculate monthly income and expenses
    const income = this.transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    const expenses = this.transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    this.monthlyData = { income, expenses };

    // Calculate category data for expenses
    this.categoryData = this.transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => {
        const category =
          typeof t.category === 'object' ? t.category?.name :
          t.category || 'Uncategorized';

        acc[category] = (acc[category] || 0) + Math.abs(t.amount);
        return acc;
      }, {} as Record<string, number>);
  });
}


  onMonthChange(): void {
    this.loadData();
  }

  exportToPDF(): void {
  const doc = new jsPDF();

  const reportTitle = `Financial Report for ${this.selectedMonth}`;
  const reportPeriod = this.getReportPeriod();
  const netSavings = this.getNetSavings();
  const isPositive = this.isSavingsPositive();

  doc.setFontSize(16);
  doc.text(reportTitle, 10, 10);
  doc.setFontSize(12);
  doc.text(`Period: ${reportPeriod}`, 10, 20);
  doc.text(`Income: $${this.monthlyData.income.toLocaleString()}`, 10, 30);
  doc.text(`Expenses: $${this.monthlyData.expenses.toLocaleString()}`, 10, 40);
  doc.text(`Net Savings: $${netSavings.toLocaleString()}`, 10, 50);

  doc.setTextColor(isPositive ? 'green' : 'red');
  doc.text(isPositive ? 'Positive Savings' : 'Negative Savings', 10, 60);
  doc.setTextColor('black');


  autoTable(doc, {
    startY: 70,
    head: [['Category', 'Amount']],
    body: Object.entries(this.categoryData).map(([category, amount]) => [category, `$${amount.toLocaleString()}`])
  });

  doc.save(`financial-report-${this.selectedMonth}.pdf`);
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
