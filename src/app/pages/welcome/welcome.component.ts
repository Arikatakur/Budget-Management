// src/app/welcome/welcome.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // For *ngIf
import { RouterModule } from '@angular/router'; // For routerLink in the header

// Assuming these are your existing standalone components
import { LoginComponent } from '../login/login.component'; // Adjust path if necessary
import { RegisterComponent } from '../register/register.component'; // Adjust path if necessary

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
  standalone: true, // Mark as standalone component
  imports: [
    CommonModule,
    RouterModule,
    LoginComponent, // Import your existing LoginComponent
    RegisterComponent // Import your existing RegisterComponent
  ]
})
export class WelcomeComponent implements OnInit {
  showLogin: boolean = false;
  showRegister: boolean = false;

  constructor() { } // Removed AuthService as you're not using Firebase directly here

  ngOnInit(): void {
    // If you need to check authentication status here (e.g., to redirect
    // already logged-in users away from the welcome page),
    // you would inject your custom AuthService and use it here.
    // Example (conceptual, depends on your AuthService):
    // if (this.myAuthService.isLoggedIn()) {
    //   this.router.navigate(['/dashboard']);
    // }
  }

  openLoginModal(): void {
    this.showRegister = false; // Close register if open
    this.showLogin = true;
  }

  openRegisterModal(): void {
    this.showLogin = false; // Close login if open
    this.showRegister = true;
  }

  closeModals(): void {
    this.showLogin = false;
    this.showRegister = false;
  }
}
