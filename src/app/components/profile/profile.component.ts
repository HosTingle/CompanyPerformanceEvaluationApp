import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { QuestionspageComponent } from "../questionspage/questionspage.component";
import { UpdateuserpageComponent } from "../updateuserpage/updateuserpage.component";
import { SidebarComponent } from "../sidebar/sidebar.component";
import { AuthServiceService } from '../../services/auth.service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserStoreService } from '../../services/user-store.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, QuestionspageComponent, UpdateuserpageComponent, SidebarComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  id!:number;
  public user:any=[];
  role!:string;
  pagetut:boolean=true;
  constructor(
    private authService: AuthServiceService,
    private activitatedRoute:ActivatedRoute,
    
    private toast:ToastrService,
    private router:Router,
    private userstor:UserStoreService,
 
  ) {}
  ngOnInit(): void {
    this.getuser();
  };
  bol:boolean=true;

  changebol(){
    this.bol= !this.bol
  }
  edituser(){
    
  }
  getuser(){
    this.userstor.getUserIdStore()
  .subscribe(val=>{
    const USERNAMEFromToken=this.authService.getUserIdFromToken()
    this.id=val || USERNAMEFromToken
  });
  this.userstor.getRoleFromStore()
  .subscribe(val=>{
    const getRoleFromToken=this.authService.getRoleFromToken();
    this.role=val || getRoleFromToken
  })
    this.authService.getuser(this.id).subscribe({
      
      next:(res)=>{
        this.user=res.data

      },
      error:(err)=>{
        this.toast.error('Bilgiler yüklenemedi.', 'Başarısız', {
          positionClass: 'toast-bottom-center' // Burada konumu belirleyebilirsiniz
        });
      }
    })
  }
}
