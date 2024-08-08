import { CommonModule, CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../services/auth.service.service';
import { UserStoreService } from '../../services/user-store.service';
import { SidebarComponent } from "../sidebar/sidebar.component";

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [HttpClientModule, DecimalPipe, DatePipe, CurrencyPipe, CommonModule, SidebarComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit{
  public USERNAME:string="";
  public role:string="";
  public users:any=[];
  constructor(
    private router:Router,
    private localStorageService: LocalStorageService,
    private authservice:AuthServiceService,
    private storeservice:UserStoreService
  ) {}
ngOnInit(): void {
  this.getalluser();
this.getuser();

}
getalluser(){
  this.authservice.getalluser().subscribe((response:any)=>{
    if (response.data !=null) {
      this.users=response.data;
      console.log(response.data);
    } 
  });
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
}
logout(){
  this.authservice.signOut("token");
}
}
