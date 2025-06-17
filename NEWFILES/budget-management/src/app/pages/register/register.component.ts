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
  selector: 'app-register',
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
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  phone = '';
  errorMessage = '';

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    if (!this.name || !this.email || !this.password) {
      this.errorMessage = 'All fields are required';
      return;
    }

    this.auth.register({
      name: this.name,
      email: this.email,
      password: this.password,
      phone: this.phone,
    }).subscribe({
      next: () => this.router.navigate(['/login']),
      error: (err) => this.errorMessage = err.error.message || 'Registration failed',
    });
  }
}
