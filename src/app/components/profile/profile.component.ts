import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { QuestionspageComponent } from "../questionspage/questionspage.component";
import { UpdateuserpageComponent } from "../updateuserpage/updateuserpage.component";
import { SidebarComponent } from "../sidebar/sidebar.component";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, QuestionspageComponent, UpdateuserpageComponent, SidebarComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  bol:boolean=true;

  changebol(){
    this.bol= !this.bol
  }
  edituser(){
    
  }
}
