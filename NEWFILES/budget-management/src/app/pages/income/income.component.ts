import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-income',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent {
  salaries: number[] = Array(5).fill(0);
  averageIncome: number = 0;
  monthLabels: string[] = [];

  constructor(private userService: UserService) {
    this.generateMonthLabels();
  }

  calculateAverage(): void {
    const total = this.salaries.reduce((sum, salary) => sum + (Number(salary) || 0), 0);
    this.averageIncome = total / this.salaries.length;

    const userId = localStorage.getItem('userId');

    if (userId) {
      this.userService.updateAverageIncome(userId, this.averageIncome).subscribe({
        next: () => console.log('Average income saved'),
        error: (err: any) => console.error('Failed to save average income', err)
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

  getMonthLabel(index: number): string {
    return this.monthLabels[index] || '';
  }

}
