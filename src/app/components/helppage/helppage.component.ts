import { Component } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { AuthServiceService } from '../../services/auth.service.service';
import { MatDialog } from '@angular/material/dialog';
import { PositionService } from '../../services/position.service';
import { UserStoreService } from '../../services/user-store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-helppage',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './helppage.component.html',
  styleUrl: './helppage.component.css'
})
export class HelppageComponent {
  constructor(
    private authservice:AuthServiceService,
    public matdialog:MatDialog,
    private positionser:PositionService,
    private userstor:UserStoreService,
    private router:Router,
  ) {}
  redirectToExternalSite() {
    window.location.href = 'https://www.ntv.com.tr/vakifbank';
  }
  redirectToExternalSitee() {
    this.router.navigate(["helpp"]);
  }
  redirectToExternalSiteee() {
    this.router.navigate(["userteam"]);
  }

}
