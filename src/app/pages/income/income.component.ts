import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-income',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent {
  private userService = inject(UserService);

  salaries: number[] = Array(5).fill(null);
  averageIncome: number | null = null;
  monthLabels: string[] = [];

  constructor() {
    this.generateMonthLabels();
  }

  calculateAverage(): void {
    const validSalaries = this.salaries.map(s => Number(s) || 0).filter(s => s > 0);
    if (validSalaries.length === 0) {
      this.averageIncome = 0;
      return;
    }
    const total = validSalaries.reduce((sum, salary) => sum + salary, 0);
    this.averageIncome = total / validSalaries.length;

    const userId = localStorage.getItem('userId');
    if (userId) {
      this.userService.updateAverageIncome(userId, this.averageIncome).subscribe({
        next: () => console.log('Average income saved successfully.'),
        error: (err: unknown) => console.error('Failed to save average income', err)
      });
    }
  }

  private generateMonthLabels(): void {
    const today = new Date();
    this.monthLabels = [];
    for (let i = 4; i >= 0; i--) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      this.monthLabels.push(date.toLocaleString('default', { month: 'long' }));
    }
  }

  trackByIndex(index: number): number {
    return index;
  }
}
