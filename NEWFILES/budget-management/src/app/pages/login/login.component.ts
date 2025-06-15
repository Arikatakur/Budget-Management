import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    this.auth.login({ email: this.email, password: this.password }).subscribe({
      next: () => {
        // The userId is now saved automatically by the AuthService.
        // We can just navigate to the dashboard.
        this.router.navigate(['/dashboard']);
      },
      error: err => {
        // Using console.error is better for debugging than alert()
        console.error('Login failed:', err); 
        alert(err.error?.error || 'Login failed');
      }
    });
  }
}