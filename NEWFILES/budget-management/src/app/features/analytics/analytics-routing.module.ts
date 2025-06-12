import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportsComponent } from './components/reports/reports.component';
import { AiSuggestionsComponent } from './components/ai-suggestions/ai-suggestions.component';

const routes: Routes = [
  { path: 'reports', component: ReportsComponent },
  { path: 'ai', component: AiSuggestionsComponent },
  { path: '', redirectTo: 'reports', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnalyticsRoutingModule { }
