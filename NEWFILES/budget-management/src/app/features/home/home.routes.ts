import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';

// This exports the routes for the home feature directly.
export const HOME_ROUTES: Routes = [
  { path: '', component: HomePageComponent }
];
