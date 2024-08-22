import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { QuestionspageComponent } from "../questionspage/questionspage.component";
import { SidebarComponent } from "../sidebar/sidebar.component";
import { AuthServiceService } from '../../services/auth.service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserStoreService } from '../../services/user-store.service';
import { UserDetail } from '../../model/UserAuth/userDetail';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, QuestionspageComponent, SidebarComponent,FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  id!:number;
  public user:any=[];
  role!:string;
  pagetut:boolean=true;
  userdet=new UserDetail();
  constructor(
    private authService: AuthServiceService,
    private activitatedRoute:ActivatedRoute,
    private userser:UserService,
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
  updateuser(){
    this.userdet.userid=this.user.userid;
    this.userdet.birthdate=this.user.birthdate;
    this.userdet.city=this.user.city;
    this.userdet.country=this.user.country;
    this.userdet.email=this.user.email;
    this.userdet.name=this.user.name;
    this.userdet.phone=this.user.phone;
    this.userdet.teamname=this.user.teamname;
    this.userdet.imageurl=this.user.imageurl;
    this.userdet.status=this.user.status;
    this.userdet.role= this.role;
    this.userser.updateuserinfo(this.userdet).subscribe({
      
      next:(res)=>{
        this.toast.success('Bilgiler güncellendi.', 'Başarılı', {
          positionClass: 'toast-bottom-center' // Burada konumu belirleyebilirsiniz
        });
    this.changebol();
      },
      error:(err)=>{
        this.toast.error('Bilgiler güncellenmedi.', 'Başarısız', {
          positionClass: 'toast-bottom-center' // Burada konumu belirleyebilirsiniz
        });
      }
    })
  }
}
