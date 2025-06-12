import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./features/home/home.routes').then(m => m.HOME_ROUTES) },
  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES)
  },  
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
  {
    path: 'transactions',
    loadChildren: () => import('./features/transactions/transactions.routes').then(m => m.TRANSACTIONS_ROUTES)
  },
  {
    path: 'income',
    loadChildren: () => import('./features/income/income.routes').then(m => m.INCOME_ROUTES)
  },
  {
    path: 'analytics',
    loadChildren: () => import('./features/analytics/analytics.routes').then(m => m.ANALYTICS_ROUTES)
  },
  { path: '**', redirectTo: 'home' }
];