import { Routes } from '@angular/router';
import { ReportsComponent } from './components/reports/reports.component';
import { AiSuggestionsComponent } from './components/ai-suggestions/ai-suggestions.component';

export const ANALYTICS_ROUTES: Routes = [
  { path: 'reports', component: ReportsComponent },
  { path: 'ai-suggestions', component: AiSuggestionsComponent }
];
