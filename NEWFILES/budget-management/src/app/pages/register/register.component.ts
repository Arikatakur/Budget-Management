import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  phone = '';

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    this.auth.register({
      name: this.name,
      email: this.email,
      password: this.password,
      phone: this.phone
    }).subscribe({
      next: () => this.router.navigate(['/login']),
      error: err => alert(err.error?.error || 'Registration failed')
    });
  }
}
