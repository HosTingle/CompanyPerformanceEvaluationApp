import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ResetPassword } from '../../model/UserAuth/resetPasswordModel';
import { ResetPasswordServiceService } from '../../services/reset-password.service.service';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from '../../services/auth.service.service';

@Component({
  selector: 'app-reset',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './reset.component.html',
  styleUrl: './reset.component.css'
})
export class ResetComponent implements OnInit {
  emailToReset!:string;
  emailToken!:string;
  userResetForm!: FormGroup;
  resetPasswordObj=new ResetPassword()
  constructor(
    private authService: AuthServiceService,
    private formBuilder: FormBuilder,
    private activitatedRoute:ActivatedRoute,
    private resetServices:ResetPasswordServiceService,
    private toast:ToastrService,
    private router:Router,
 
  ) {}
  ngOnInit(): void {
    this.authService.checkloginin();
    this.createUserResetPassForm();
    this.activitatedRoute.queryParams.subscribe(val=>{
      this.emailToReset=val['email'];

      let uriToken=val['code'];
      this.emailToken=uriToken.replace(/ /g,'+'); 
      console.log(this.emailToken);
      console.log(this.emailToReset)
    })
  };
  createUserResetPassForm() {
    this.userResetForm= this.formBuilder.group({
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required],
    });
  }
  reset(){
    if(this.userResetForm.valid){
      this.resetPasswordObj.email=this.emailToReset;
      this.resetPasswordObj.confirmPassword=this.userResetForm.value.passwordConfirm;
      this.resetPasswordObj.newPassword=this.userResetForm.value.password;
      this.resetPasswordObj.emailToken=this.emailToken;           
      this.resetServices.resetPassword(this.resetPasswordObj).subscribe({
        next:(res)=>{
          this.toast.success('Başarılı', res.message, { 
            positionClass: 'toast-bottom-center' // Burada konumu belirleyebilirsiniz
          });
          this.router.navigate(['/']);
        },
        error:(err)=>{
          this.toast.error('Başarisiz', err.message, {
            positionClass: 'toast-bottom-center' // Burada konumu belirleyebilirsiniz
          });
        }
      }  );
    }
    else{

    }
  }

}
