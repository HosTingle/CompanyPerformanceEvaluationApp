import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DataDisplayComponent } from './components/data-display/dataDisplay/data-display.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [  {path:"",pathMatch:"full", component:LoginComponent},
    {path:"datadisplay", component:DataDisplayComponent},

];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoute { }