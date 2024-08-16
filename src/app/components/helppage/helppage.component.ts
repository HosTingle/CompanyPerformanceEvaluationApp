import { Component } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";

@Component({
  selector: 'app-helppage',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './helppage.component.html',
  styleUrl: './helppage.component.css'
})
export class HelppageComponent {
  redirectToExternalSite() {
    window.location.href = 'https://www.ntv.com.tr/vakifbank';
  }
  redirectToExternalSitee() {
    window.location.href = '  https://www.vakifbank.com.tr/tr/yardim-merkezi';
  }
  redirectToExternalSiteee() {
    window.location.href = '    https://www.vakifbank.com.tr/tr/bankamiz/yatirimci-iliskileri/banka-bilgilerimiz/ust-duzey-yonetim';
  }

}
