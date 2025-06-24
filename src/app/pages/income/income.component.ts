import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-income',
  standalone: true,
  imports: [CommonModule, FormsModule], // No longer imports FormFieldComponent
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent {
  private userService = inject(UserService);

  salaries: number[] = Array(5).fill(null); // Initialize with null for placeholders
  averageIncome: number | null = null;
  monthLabels: string[] = [];

  constructor() {
    this.generateMonthLabels();
  }

  /**
   * Calculates the average of the provided salaries and saves it.
   */
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

  /**
   * Generates labels for the last 5 months.
   */
  private generateMonthLabels(): void {
    const today = new Date();
    this.monthLabels = [];
    for (let i = 4; i >= 0; i--) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      this.monthLabels.push(date.toLocaleString('default', { month: 'long' }));
    }
  }

  /**
   * A trackBy function for the ngFor loop to improve performance.
   * @param index The index of the item.
   * @returns The index as a unique identifier.
   */
  trackByIndex(index: number): number {
    return index;
  }
}
