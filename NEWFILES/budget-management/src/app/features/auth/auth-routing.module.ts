import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // Add your auth feature routes here, e.g.:
  // { path: 'login', component: LoginComponent },
  // { path: 'register', component: RegistrationComponent },
  // { path: 'password-recovery', component: PasswordRecoveryComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }