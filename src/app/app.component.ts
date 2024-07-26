import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from "./components/login/login.component";
import { TrimTextPipe } from './pipes/trimtext';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule,RouterOutlet, LoginComponent,TrimTextPipe]
})
export class AppComponent {
  title = 'my-angular-app';
}
