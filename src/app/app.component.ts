import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataDisplayComponent } from './components/data-display/dataDisplay/data-display.component';
import { LoginComponent } from "./components/login/login.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, DataDisplayComponent, LoginComponent]
})
export class AppComponent {
  title = 'my-angular-app';
}
