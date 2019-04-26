import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component'
import { MainPageComponent } from './main-page/main-page.component'
import { RegistrationComponent } from './registration/registration.component';

export const routes: Routes = [
  { path: 'main', component: MainPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [
      RouterModule.forRoot(routes),
    ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
