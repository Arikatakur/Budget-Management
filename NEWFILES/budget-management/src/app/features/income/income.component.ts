// import { Component } from '@angular/core';
// import { UserService } from '../../core/services/user.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-income',
//   templateUrl: './income.component.html',
//   standalone: true,
//   imports: [],
// })
// export class IncomeComponent {
//   salaries: number[] = [0, 0, 0, 0, 0];
//   averageIncome = 0;
//   message = '';

//   constructor(private userService: UserService, private router: Router) {}

//   calculateAverage() {
//     const validSalaries = this.salaries.filter(s => s > 0);
//     if (validSalaries.length < 5) {
//       this.message = 'Please enter all 5 monthly salaries.';
//       return;
//     }

//     const total = validSalaries.reduce((a, b) => a + b, 0);
//     this.averageIncome = total / 5;

//     this.userService.updateAverageIncome(this.averageIncome).subscribe({
//       next: () => this.message = 'Average income saved successfully!',
//       error: () => this.message = 'Error saving income.'
//     });
//   }
// }
