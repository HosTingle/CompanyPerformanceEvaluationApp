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
import { ProfileComponent } from './components/profile/profile.component';
import { EvaluateComponent } from './components/evaluate/evaluate.component';
import { SignupadressComponent } from './components/signupadress/signupadress.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { TaskdetailComponent } from './components/taskdetail/taskdetail.component';
import { HelppageComponent } from './components/helppage/helppage.component';
import { EvaluateresponsComponent } from './components/evaluaterespons/evaluaterespons.component';
import { AdminmanagmentComponent } from './components/adminmanagment/adminmanagment.component';
import { EvaluaterespdetailComponent } from './components/evaluaterespdetail/evaluaterespdetail.component';
import { TaskassignpageComponent } from './components/taskassignpage/taskassignpage.component';
import { EvaluateeComponent } from './components/teamb/evaluate.component';
import { HelppComponent } from './components/helpp/helpp.component';

export const routes: Routes = [ 
  { path: '', redirectTo: 'loginpage', pathMatch: 'full' }, 
     {path:"loginpage", component:LoginComponent},
    {path:"homepage", component:HomepageComponent,canActivate:[authGuard]},
    {path:"signuppage", component:SignupComponent},
    {path:"forgotpage", component:ForgotpassComponent},
    {path:"reset-password",component:ResetComponent},
    { path: '404', component: NotfoundComponent }, 
    { path: 'helpp', component: HelppComponent ,canActivate:[authGuard]}, 
    {path:'profilepage',component:ProfileComponent,canActivate:[authGuard]},
    {path:'evaluatepage',component:EvaluateComponent,canActivate:[authGuard]},
    {path:'signadresspage',component:SignupadressComponent},
    {path:'taskspage',component:TasksComponent,canActivate:[authGuard]},
    { path:'taskspage/:id',component:TaskdetailComponent,canActivate:[authGuard]},
    { path:'helppage',component:HelppageComponent,canActivate:[authGuard]},
    { path:'evaluateresult',component:EvaluateresponsComponent,canActivate:[authGuard]},
    {path:'usermanagment',component:AdminmanagmentComponent,canActivate:[authGuard]},
    {path:'evalresdetail/:id',component:EvaluaterespdetailComponent,canActivate:[authGuard]},
    {path:'usermanagment/:id',component:TaskassignpageComponent,canActivate:[authGuard]},
    {path:'userteam',component:EvaluateeComponent,canActivate:[authGuard]},
  { path: '**', redirectTo: '/404' },


];
@NgModule({
    imports: [RouterModule.forRoot(routes),BrowserModule,
      BrowserAnimationsModule,],
    exports: [RouterModule,]
  })
  export class AppRoutes { }