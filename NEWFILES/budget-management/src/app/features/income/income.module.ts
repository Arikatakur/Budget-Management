import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IncomeRoutingModule } from './income-routing.module';
import { IncomeHistoryComponent } from './components/income-history/income-history.component';


@NgModule({
  imports: [
    CommonModule,
    IncomeRoutingModule,
    IncomeHistoryComponent
  ]
})
export class IncomeModule { }
