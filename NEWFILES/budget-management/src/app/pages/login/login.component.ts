import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { FormFieldComponent } from '../../shared/components/form-field.component';
import { SharedButtonComponent } from '../../shared/components/shared-button.component';
import { SharedCardComponent } from '../../shared/components/shared-card.component';
import { SharedErrorComponent } from '../../shared/components/shared-error.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    FormFieldComponent,
    SharedButtonComponent,
    SharedCardComponent,
    SharedErrorComponent
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    this.auth.login({ email: this.email, password: this.password }).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: err => {
        this.errorMessage = err.error?.error || 'Login failed';
      }
    });
  }
}