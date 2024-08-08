import { Component } from '@angular/core';
import { AuthServiceService } from '../../services/auth.service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserStoreService } from '../../services/user-store.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { UserDetail } from '../../model/UserAuth/userDetail';

@Component({
  selector: 'app-updateuserpage',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './updateuserpage.component.html',
  styleUrl: './updateuserpage.component.css'
})
export class UpdateuserpageComponent {
  userupdateForm!: FormGroup;
  id!:number;
  public user:any=[];
  role!:string;
  userdet=new UserDetail();
  constructor(
    private authService: AuthServiceService,
    private userser:UserService,
    private formBuilder: FormBuilder,
    private activitatedRoute:ActivatedRoute,
    private toast:ToastrService,
    private router:Router,
    private userstor:UserStoreService,
 
  ) {}
  ngOnInit(): void {
    this.getuser();
  };
  logout(){
    this.authService.signOut("token");
  }
  routeback(){
    this.router.navigate(["profilepage"])
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
        this.userupdateForm = this.formBuilder.group({ 
          userid:[this.user.userid,Validators.required],
          name: [this.user.name, Validators.required],
          email: [this.user.email, Validators.required],
          country: [this.user.country, Validators.required],
          city: [this.user.city, Validators.required],
         phone: [this.user.phone, Validators.required],
         birthdate: [this.user.birthdate, Validators.required],
        });
      },
      error:(err)=>{
        this.toast.error('Bilgiler yüklenemedi.', 'Başarısız', {
          positionClass: 'toast-bottom-center' // Burada konumu belirleyebilirsiniz
        });
      }
    })
  }
  updateuser(){
    this.userdet.userid=this.userupdateForm.value.userid;
    this.userdet.birthdate=this.userupdateForm.value.birthdate;
    this.userdet.city=this.userupdateForm.value.city;
    this.userdet.country=this.userupdateForm.value.country;
    this.userdet.email=this.userupdateForm.value.email;
    this.userdet.name=this.userupdateForm.value.name;
    this.userdet.phone=this.userupdateForm.value.phone;
    this.userser.updateuserinfo(this.userdet).subscribe({
      
      next:(res)=>{
        this.toast.success('Bilgiler güncellendi.', 'Başarılı', {
          positionClass: 'toast-bottom-center' // Burada konumu belirleyebilirsiniz
        });
        this.router.navigate(["homepage"])
      },
      error:(err)=>{
        this.toast.error('Bilgiler güncellenmedi.', 'Başarısız', {
          positionClass: 'toast-bottom-center' // Burada konumu belirleyebilirsiniz
        });
      }
    })
  }
}
