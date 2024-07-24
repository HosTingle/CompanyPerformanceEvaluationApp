import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../model/UserAuth/login';
import { ApiUrl } from '../constants/api-url';
import { Observable, Subject } from 'rxjs';
import { EntityReponseModel } from '../model/entityResponseModel';
import { Token } from '../model/UserAuth/token';
import { Register } from '../model/UserAuth/register';
import { ReponseModel } from '../model/responseModel';
import { LocalStorageService } from './local-storage.service';
import { Route, Router } from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import { EntityReponseModelL } from '../model/entityListResponseModel';
import { UserAuthM } from '../model/UserAuth/userauthm';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  apiUrl = ApiUrl.localurl;
  private userPayload:any;
  constructor(private httpClient:HttpClient,
    private locastorage:LocalStorageService,
    private router:Router
  ) { 
  this.userPayload=this.decodejwt()
  }
  private loggedIn:boolean = false;
  isLoggedInChanged = new Subject<boolean>();

  login(loginModel:Login):Observable<EntityReponseModel<Token>>{
    let newPath = this.apiUrl + 'UserAuth/login'
     return this.httpClient.post<EntityReponseModel<Token>>(newPath,loginModel)
  }
  getalluser():Observable<EntityReponseModelL<UserAuthM>>{
    let newPath = this.apiUrl + 'UserAuth/getall'
    return this.httpClient.get<EntityReponseModelL<UserAuthM>>(newPath)
   
  }
  loggedin():boolean{
    return !!localStorage.getItem('token');
  }
  register(registerModel:Register):Observable<ReponseModel>{
    let newPath = this.apiUrl + 'UserAuth/register'
     return this.httpClient.post<ReponseModel>(newPath,registerModel)
  }
  signOut(name:string){
    this.locastorage.removeItem(name);
    this.router.navigate(["loginpage"]);
  }
  decodejwt(){
    const jwtHelper=new JwtHelperService();
    const token=this.locastorage.getItem('token')!;
    console.log(jwtHelper.decodeToken(token))
    return jwtHelper.decodeToken(token);
  }
  getRoleFromToken(){
    if(this.userPayload)
      return this.userPayload.POSITIONNAME;
  }
  getUsernameFromToken(){
    if(this.userPayload)
      return this.userPayload.USERNAME;
  }

}
