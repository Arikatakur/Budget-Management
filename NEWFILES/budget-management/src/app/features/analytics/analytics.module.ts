import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalyticsRoutingModule } from './analytics-routing.module';
import { ReportsComponent } from './components/reports/reports.component';
import { AiSuggestionsComponent } from './components/ai-suggestions/ai-suggestions.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AnalyticsRoutingModule,
    ReportsComponent,
    AiSuggestionsComponent
  ]
})
export class AnalyticsModule { }
