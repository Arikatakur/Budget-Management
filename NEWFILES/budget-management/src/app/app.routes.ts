// import { Routes } from '@angular/router';

// export const routes: Routes = [
//   { path: '', redirectTo: 'home', pathMatch: 'full' },
//   { path: 'home', loadChildren: () => import('./features/home/home.routes').then(m => m.HOME_ROUTES) },
//   {
//     path: 'dashboard',
//     loadChildren: () => import('./features/dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES)
//   },  
//   {
//     path: 'auth',
//     loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES)
//   },
//   {
//     path: 'transactions',
//     loadChildren: () => import('./features/transactions/transactions.routes').then(m => m.TRANSACTIONS_ROUTES)
//   },
//   {
//     path: 'income',
//     loadChildren: () => import('./features/income/income.routes').then(m => m.INCOME_ROUTES)
//   },
//   {
//     path: 'analytics',
//     loadChildren: () => import('./features/analytics/analytics.routes').then(m => m.ANALYTICS_ROUTES)
//   },
//   { path: '**', redirectTo: 'home' }
// ];

import { Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { IncomeComponent } from './pages/income/income.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { AiSuggestionsComponent } from './pages/ai-suggestions/ai-suggestions.component';
import { ReportsComponent } from './pages/reports/reports.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'income', component: IncomeComponent },
  { path: 'transactions', component: TransactionsComponent },
  { path: 'ai-suggestions', component: AiSuggestionsComponent },
  { path: 'reports', component: ReportsComponent },
  { path: '**', redirectTo: 'dashboard' }
];
