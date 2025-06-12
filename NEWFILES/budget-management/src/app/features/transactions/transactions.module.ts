import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionAddComponent } from './components/transaction-add/transaction-add.component';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TransactionsRoutingModule,
    TransactionAddComponent,
    TransactionListComponent
  ]
})
export class TransactionsModule { }
