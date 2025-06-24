// src/app/register/register.component.ts

import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthService } from '../../services/auth.service'; // Adjust path if necessary

// Custom validator function to check if two fields match
export function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  if (!password || !confirmPassword || !password.value || !confirmPassword.value) {
    return null;
  }
  return password.value === confirmPassword.value ? null : { passwordMismatch: true };
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  @Output() closeModal = new EventEmitter<void>();
  @Output() goToLogin = new EventEmitter<void>();
  @Input() isClosing: boolean = false;

  registerForm!: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: passwordMatchValidator
    });
  }

  onSubmit(): void {
    this.registerForm.markAllAsTouched();
    if (this.registerForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const registrationData = {
      name: this.registerForm.value.name,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
    };

    this.authService.register(registrationData).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe({
      next: (response) => {
        console.log('Registration successful!', response);
        this.closeModal.emit();
        this.router.navigate(['/dashboard']);
      },
      error: (err: HttpErrorResponse) => {
        console.error('Registration failed:', err);
        this.errorMessage = this.getFriendlyErrorMessage(err);
      }
    });
  }

  switchToLogin(): void {
    this.goToLogin.emit();
  }

  private getFriendlyErrorMessage(error: HttpErrorResponse): string {
    if (error.error && typeof error.error.message === 'string') {
      return error.error.message;
    }

    switch (error.status) {
      case 409: // Conflict
        return 'This email address is already registered.';
      case 400: // Bad Request
        return 'Invalid data provided. Please check the form and try again.';
      default:
        return 'An unexpected server error occurred. Please try again later.';
    }
  }
}