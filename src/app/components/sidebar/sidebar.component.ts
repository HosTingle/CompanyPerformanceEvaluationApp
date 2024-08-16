import { Component } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../services/auth.service.service';
import { UserStoreService } from '../../services/user-store.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  public USERNAME:string="";
  public role:string="";
  public users:any=[];
  sayi!:number;
  constructor(
    private router:Router,
    private localStorageService: LocalStorageService,
    private authservice:AuthServiceService,
    private storeservice:UserStoreService
  ) {}
  ngOnInit(): void {
  this.getuser();
  
  }
  logout(){
    this.authservice.signOut("token");
  }
  getuser(){
    this.storeservice.getFullNammeFromStore() 
    .subscribe(val=>{
      const USERNAMEFromToken=this.authservice.getUsernameFromToken();
      this.USERNAME=val || USERNAMEFromToken
    });
    this.storeservice.getRoleFromStore()
    .subscribe(val=>{
      const getRoleFromToken=this.authservice.getRoleFromToken();
      this.role=val || getRoleFromToken
    })
    this.storeservice.getLevelFromStore()
    .subscribe(val=>{
      const getLevelFromToken=this.authservice.getUserLevelFromToken();
      this.sayi=val || getLevelFromToken
    })
  }
}
