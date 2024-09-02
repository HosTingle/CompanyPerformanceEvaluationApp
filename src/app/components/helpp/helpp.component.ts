import { Component } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-helpp',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './helpp.component.html',
  styleUrl: './helpp.component.css'
})
export class HelppComponent {
  constructor(
    private router:Router,
  ) {}
  onSubmit() {
    alert('Şikayetiniz başarıyla gönderilmiştir!');
    this.router.navigate(["homepage"]);
  }
}
