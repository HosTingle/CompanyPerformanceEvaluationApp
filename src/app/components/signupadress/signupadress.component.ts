import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthServiceService } from '../../services/auth.service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { Register } from '../../model/UserAuth/register';

@Component({
  selector: 'app-signupadress',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './signupadress.component.html',
  styleUrl: './signupadress.component.css'
})
export class SignupadressComponent implements OnInit{
  userRegisterAddressForm!: FormGroup;
  reg!:Register;
  constructor(
    private authService: AuthServiceService,
    private formBuilder: FormBuilder,
    private router:Router,
    private toastrService: ToastrService,
 
  ) {}
  ngOnInit(): void {
    this.authService.checkloginin();
    this.createUserRegisterForm();
    this.reg=this.authService.getMyClassInstance();
  }
  createUserRegisterForm() { 
    this.userRegisterAddressForm= this.formBuilder.group({
      country: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      addressDetail: ['', Validators.required],
    });
  }
  assigndata(){
    if (!this.reg) {
      this.reg = new Register();
    }
    this.reg.addressDetail= this.userRegisterAddressForm.get('addressDetail')?.value;
    this.reg.city= this.userRegisterAddressForm.get('city')?.value;
    this.reg.country = this.userRegisterAddressForm.get('country')?.value;
    this.reg.state= this.userRegisterAddressForm.get('state')?.value;
  }

  register() {
    this.assigndata();
    this.authService.register(this.reg).subscribe((response:any)=>{
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
