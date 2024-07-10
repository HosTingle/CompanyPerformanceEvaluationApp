import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthServiceService } from '../../services/auth.service.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';
import { ToastrService } from 'ngx-toastr';
import { Token } from '../../model/token';

@Component({
  selector: 'app-login',
  standalone: true, 
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  userLoginForm!: FormGroup;
  datas!:Token;

  constructor(
    private authService: AuthServiceService,
    private formBuilder: FormBuilder,
    private router:Router,
    private toastrService: ToastrService,
    private localStorageService: LocalStorageService,
 
  ) {}
  ngOnInit(): void {
    this.createUserLoginForm();
  }

  createUserLoginForm() {
    this.userLoginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  login() {
    if (true) {
      let loginModel = Object.assign({}, this.userLoginForm.value);
      this.authService.login(loginModel).subscribe((response:any)=>{
        this.datas=response.data;
          this.toastrService.success('Giriş Başarili', 'Başarili');
          this.localStorageService.setItem('token', this.datas.token);
          this.router.navigate(["datadisplay"])
      });
    }
  }
}