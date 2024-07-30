import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignupComponent } from './components/signup/signup.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { authGuard } from './guards/auth.guard';
import { ForgotpassComponent } from './components/forgotpass/forgotpass.component';

export const routes: Routes = [ 
  { path: '', redirectTo: 'loginpage', pathMatch: 'full' }, // Boş path'i loginpage'e yönlendir
     {path:"loginpage", component:LoginComponent},
    {path:"homepage", component:HomepageComponent,canActivate:[authGuard]},
    {path:"signuppage", component:SignupComponent},
    {path:"forgotpage", component:ForgotpassComponent},

];
@NgModule({
    imports: [RouterModule.forRoot(routes),BrowserModule,
      BrowserAnimationsModule,],
    exports: [RouterModule,]
  })
  export class AppRoutes { }