import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ResetPasswordServiceService } from '../../services/reset-password.service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../services/auth.service.service';

@Component({
  selector: 'app-forgotpass',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './forgotpass.component.html',
  styleUrl: './forgotpass.component.css'
})
export class ForgotpassComponent implements OnInit {
  forgetpassForm!: FormGroup;
  resetPasswordEmail!:string;
  isValidEmail!: boolean;

  constructor(    private formBuilder: FormBuilder,
    private resetServices:ResetPasswordServiceService,
    private toastrService: ToastrService,
    private router:Router,
    private authService: AuthServiceService,
  ) {

  }
  ngOnInit(): void {
    this.authService.checkloginin();
    this.createforgotForm();
  }
  checkValidEmail(event:string){

    const value=event;
    const pattern=/^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/;
    this.isValidEmail=pattern.test(value);
    return this.isValidEmail;
  }
  createforgotForm() {
    this.forgetpassForm = this.formBuilder.group({
      email: ['', Validators.required],
    });
  }
  confirmToSend(){
    if(this.checkValidEmail(this.resetPasswordEmail)){
      console.log(this.resetPasswordEmail);
      
      this.resetServices.sendResetPasswordLink(this.resetPasswordEmail).subscribe({
        next:(res)=>{
          this.toastrService.success("E-posta Gönderildi, Lütfen E-posta'nızı kontrol edin Kontrol Edin", 'Başarılı', {
            positionClass: 'toast-bottom-center'
          });
          const buttonRef=document.getElementById("closeBtn");
          buttonRef?.click();
          this.router.navigate(["loginpage"]);

        },
        error:(err)=>{
          this.toastrService.error('Böyle Bir E-mail Yok.', 'Başarısız', {
            positionClass: 'toast-bottom-center' // Burada konumu belirleyebilirsiniz
          });
        }
      }
  );
    }
    else{
      this.toastrService.error('Geçerli Bir E-mail Girin', 'Başarısız', {
        positionClass: 'toast-bottom-center' // Burada konumu belirleyebilirsiniz
      });
    }
  }

  }