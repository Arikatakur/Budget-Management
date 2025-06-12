import { Routes } from '@angular/router';
import { TransactionAddComponent } from './components/transaction-add/transaction-add.component';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';

export const TRANSACTIONS_ROUTES: Routes = [
  { path: 'transactions/add', component: TransactionAddComponent },
  { path: 'transactions/list', component: TransactionListComponent },
  { path: 'transactions', redirectTo: 'transactions/list', pathMatch: 'full' }
];
