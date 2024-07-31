import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthServiceService } from '../../services/auth.service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Token } from '../../model/UserAuth/token';
import { UserStoreService } from '../../services/user-store.service';

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
    private userStore:UserStoreService,
 
 
  ) {}
  ngOnInit(): void {
    this.checkloginin();
    this.createUserLoginForm();
  }

  createUserLoginForm() {
    this.userLoginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  login() {
      let loginModel = Object.assign({}, this.userLoginForm.value);
      this.authService.login(loginModel).subscribe((response:any)=>{
        if (response.data !=null) {
          this.toastrService.success('Giriş Başarili', 'Başarili', {
            positionClass: 'toast-bottom-center' // Burada konumu belirleyebilirsiniz
          });
          this.authService.storeToken(response.data.accessToken)
          this.authService.storeRefreshToken(response.data.refreshToken)
          const tokenPayload=this.authService.decodejwt();
          this.userStore.setFullNameForStore(tokenPayload.USERNAME)
          this.userStore.setRoleForStore(tokenPayload.POSITIONNAME)
          this.router.navigate(["homepage"]);
        } else {
          this.toastrService.error('Giriş Başarisiz', 'Doğrulama Hatasi', {
            positionClass: 'toast-bottom-center' // Burada konumu belirleyebilirsiniz
          });
        }
      });
  }
  checkloginin(){
    if(this.authService.loggedin()){
       this.router.navigate(['homepage'])
    }
    else{
    }
  
  }
  routeregister(){
    this.router.navigate(["signuppage"]);
  }
  forgotPassword(){

  }
}