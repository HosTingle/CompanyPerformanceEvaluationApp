import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserStoreService } from '../../services/user-store.service';
import { AuthServiceService } from '../../services/auth.service.service';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-evaluaterespons',
  standalone: true,
  imports: [SidebarComponent, CommonModule,],
  templateUrl: './evaluaterespons.component.html',
  styleUrl: './evaluaterespons.component.css'
})
export class EvaluateresponsComponent implements OnInit {
  constructor(
    private router:Router,
    private localStorageService: LocalStorageService,
    private authservice:AuthServiceService,
    private storeservice:UserStoreService
  ) {}
ngOnInit(): void {

}
  getalluser(){
    this.authservice.getbyidevaluateuser(this.id).subscribe((response:any)=>{
      if (response.data !=null) {
        this.users=response.data;
        console.log(response.data);
      } 
    });
  }
}
