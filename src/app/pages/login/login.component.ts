// src/app/login/login.component.ts

import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthService } from '../../services/auth.service'; // Adjust path if necessary

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  @Output() closeModal = new EventEmitter<void>();
  @Output() goToRegister = new EventEmitter<void>();
  @Input() isClosing: boolean = false;

  loginForm!: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const credentials = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    this.authService.login(credentials).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe({
      next: (response) => {
        console.log('Login successful!', response);
        this.closeModal.emit();
        this.router.navigate(['/dashboard']);
      },
      error: (err: HttpErrorResponse) => {
        console.error('Login failed:', err);
        this.errorMessage = this.getFriendlyErrorMessage(err);
      }
    });
  }

  switchToRegister(): void {
    this.goToRegister.emit();
  }

  private getFriendlyErrorMessage(error: HttpErrorResponse): string {
    if (error.error && typeof error.error.message === 'string') {
      return error.error.message;
    }
    
    switch (error.status) {
      case 401:
      case 404:
        return 'Invalid email or password. Please try again.';
      default:
        return 'An unexpected server error occurred. Please try again later.';
    }
  }
}