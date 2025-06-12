import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { PasswordRecoveryComponent } from './components/password-recovery/password-recovery.component';

export const AUTH_ROUTES: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'password-recovery', component: PasswordRecoveryComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
