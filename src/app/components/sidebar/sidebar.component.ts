import { Component } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../services/auth.service.service';
import { UserStoreService } from '../../services/user-store.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  constructor(
    private router:Router,
    private localStorageService: LocalStorageService,
    private authservice:AuthServiceService,
    private storeservice:UserStoreService
  ) {}
  logout(){
    this.authservice.signOut("token");
  }
}
