import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthServiceService } from '../../services/auth.service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from '../../services/local-storage.service';
import { CommonModule } from '@angular/common';
import { Register } from '../../model/UserAuth/register';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {
  userRegisterForm!: FormGroup;
  usereg!:Register;
  showErrorMessage: boolean = false;
  constructor(
    private authService: AuthServiceService,
    private formBuilder: FormBuilder,
    private router:Router,
    private toastrService: ToastrService,
 
  ) {}
  ngOnInit(): void {
    this.authService.checkloginin();
    this.createUserRegisterForm();
  }
  createUserRegisterForm() { 
    this.userRegisterForm = this.formBuilder.group({
      name: ['', Validators.required,
        Validators.min(new Date('1950-01-01').getTime()),
        Validators.max(new Date('2000-12-31').getTime()),],
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      phone:['', Validators.required,   
        Validators.pattern(/^[0-9]{11}$/)],
      birthDate:['', Validators.required],
      teamid:['', Validators.required],
    });
  }
  navigateToAddressPage() {
    if (!this.usereg) {
      this.usereg = new Register();
    }
    this.usereg.name = this.userRegisterForm.get('name')?.value;
    this.usereg.email = this.userRegisterForm.get('email')?.value;
    this.usereg.username = this.userRegisterForm.get('username')?.value;
    this.usereg.password = this.userRegisterForm.get('password')?.value;
    this.usereg.phone = this.userRegisterForm.get('phone')?.value;
    this.usereg.birthDate = this.userRegisterForm.get('birthDate')?.value;
    this.usereg.teamid = this.userRegisterForm.get('teamid')?.value;
    const isAnyEmpty = Object.values(this.usereg).some(value => value === null || value === undefined || value === '')
    if(isAnyEmpty){
      this.toastrService.error('Lütfen bilgileri giriniz!', 'Başarısız');
    }
    else{
      this.authService.setMyClassInstance(this.usereg);
      this.router.navigate(['signadresspage']);
    }
   
  }
  onSubmit () {
    if (this.userRegisterForm.invalid) {
      this.showErrorMessage = true; // Hata mesajını göstermek için değişkeni true yapıyoruz
      alert("HATA"); // Formun başına kaydırır
      return; // Form geçersiz olduğunda işlemi durdurur
    }

    this.showErrorMessage = false; // Form geçerliyse hata mesajını gizler

    if (!this.usereg) {
      this.usereg = new Register();
    }
    this.usereg.name = this.userRegisterForm.get('name')?.value;
    this.usereg.email = this.userRegisterForm.get('email')?.value;
    this.usereg.username = this.userRegisterForm.get('username')?.value;
    this.usereg.password = this.userRegisterForm.get('password')?.value;
    this.usereg.phone = this.userRegisterForm.get('phone')?.value;
    this.usereg.birthDate = this.userRegisterForm.get('birthDate')?.value;
    this.usereg.teamid = this.userRegisterForm.get('teamid')?.value;
    const isAnyEmpty = Object.values(this.usereg).some(value => value === null || value === undefined || value === '')
    if(isAnyEmpty){
      this.toastrService.error('Lütfen bilgileri giriniz!', 'Başarısız');
    }
    else{
      this.authService.setMyClassInstance(this.usereg);
      this.router.navigate(['signadresspage']);
    } 
  }


}
