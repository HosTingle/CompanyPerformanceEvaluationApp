import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthServiceService } from '../../services/auth.service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from '../../services/local-storage.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {
  userRegisterForm!: FormGroup;
  constructor(
    private authService: AuthServiceService,
    private formBuilder: FormBuilder,
    private router:Router,
    private toastrService: ToastrService,
    private localStorageService: LocalStorageService,
 
  ) {}
  ngOnInit(): void {
    this.createUserRegisterForm();
  }
  createUserRegisterForm() { 
    this.userRegisterForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      phone:['', Validators.required],
      date:['', Validators.required],
    });
  }
  register() {
    if (true) {
      let registerModel = Object.assign({}, this.userRegisterForm.value);
      this.authService.register(registerModel).subscribe((response:any)=>{
        if (response.success) {
          this.toastrService.success(response.message, 'Başarili', {  
            positionClass: 'toast-bottom-center' // Burada konumu belirleyebilirsiniz
          });
          this.router.navigate(["loginpage"]);
        } else {
          this.toastrService.error('Giriş Başarisiz', 'Doğrulama Hatasi', {
            positionClass: 'toast-bottom-center' // Burada konumu belirleyebilirsiniz
          });
        }

      });
  
    } 
  }

}
