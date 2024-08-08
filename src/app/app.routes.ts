import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignupComponent } from './components/signup/signup.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { authGuard } from './guards/auth.guard';
import { ForgotpassComponent } from './components/forgotpass/forgotpass.component';
import { ResetComponent } from './components/reset/reset.component';
import { NotfoundComponent } from './components/notfound/notfound.component';

import { QuestionspageComponent } from './components/questionspage/questionspage.component';
import { UpdateuserpageComponent } from './components/updateuserpage/updateuserpage.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AnalyticComponent } from './components/analytic/analytic.component';
import { EvaluateComponent } from './components/evaluate/evaluate.component';
import { SignupadressComponent } from './components/signupadress/signupadress.component';

export const routes: Routes = [ 
  { path: '', redirectTo: 'loginpage', pathMatch: 'full' }, 
     {path:"loginpage", component:LoginComponent},
    {path:"homepage", component:HomepageComponent,canActivate:[authGuard]},
    {path:"signuppage", component:SignupComponent},
    {path:"forgotpage", component:ForgotpassComponent},
    {path:"reset-password",component:ResetComponent},
    { path: '404', component: NotfoundComponent }, 
    {path:'profilepage',component:ProfileComponent},
    {path:'editpage',component:UpdateuserpageComponent},
    {path:'analyticpage',component:AnalyticComponent},
    {path:'evaluatepage',component:EvaluateComponent},
    {path:'signadresspage',component:SignupadressComponent},
  { path: '**', redirectTo: '/404' },


];
@NgModule({
    imports: [RouterModule.forRoot(routes),BrowserModule,
      BrowserAnimationsModule,],
    exports: [RouterModule,]
  })
  export class AppRoutes { }