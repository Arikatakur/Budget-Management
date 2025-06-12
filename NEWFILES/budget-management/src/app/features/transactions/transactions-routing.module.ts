import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionAddComponent } from './components/transaction-add/transaction-add.component';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';

const routes: Routes = [
  { path: 'add', component: TransactionAddComponent },
  { path: 'list', component: TransactionListComponent },
  { path: '', redirectTo: 'list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionsRoutingModule { }
