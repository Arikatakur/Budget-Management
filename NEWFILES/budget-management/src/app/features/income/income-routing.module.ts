import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IncomeHistoryComponent } from './components/income-history/income-history.component';

const routes: Routes = [
  { path: '', component: IncomeHistoryComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IncomeRoutingModule { }
