import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../model/UserAuth/login';
import { ApiUrl } from '../constants/api-url';
import { Observable, Subject } from 'rxjs';
import { EntityReponseModel } from '../model/responseModels/entityResponseModel';
import { Token } from '../model/UserAuth/token';
import { Register } from '../model/UserAuth/register';
import { ReponseModel } from '../model/responseModels/responseModel';
import { LocalStorageService } from './local-storage.service';
import { Route, Router } from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import { EntityReponseModelL } from '../model/responseModels/entityListResponseModel';
import { UserAuthM } from '../model/UserAuth/userauthm';
import { TokenApiModel } from '../model/UserAuth/tokenApiModel';
import { UserDetail } from '../model/UserAuth/userDetail';
import { Evaluate } from '../model/evaluate';
import { EvaluateDetals } from '../model/evaluatedetail';
import { Userinfo } from '../model/UserAuth/userinfo';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  apiUrl = ApiUrl.localurl;
  private userPayload:any;
  userregister!:Register;
  constructor(private httpClient:HttpClient,
    private locastorage:LocalStorageService,
    private router:Router
  ) { 
  this.userPayload=this.decodejwt()
  }
  setMyClassInstance(instance: Register) {
    this.userregister = instance;
  }

  getMyClassInstance(): Register {
    return this.userregister;
  }
  private loggedIn:boolean = false;
  isLoggedInChanged = new Subject<boolean>();

  login(loginModel:Login):Observable<EntityReponseModel<TokenApiModel>>{
    let newPath = this.apiUrl + 'UserAuth/login'
     return this.httpClient.post<EntityReponseModel<TokenApiModel>>(newPath,loginModel)
  }
  getalluser(num:number):Observable<EntityReponseModelL<UserAuthM>>{
    let newPath = this.apiUrl + `UserPerformance/geallperformancedetail?id=${num}`
    return this.httpClient.get<EntityReponseModelL<UserAuthM>>(newPath)
   
  }
  getallusers():Observable<EntityReponseModelL<Userinfo>>{
    let newPath = this.apiUrl + `UserPerformance/getall`
    return this.httpClient.get<EntityReponseModelL<Userinfo>>(newPath)
   
  }
  getbyidevaluateuser(num:number):Observable<EntityReponseModelL<EvaluateDetals>>{
    let newPath = this.apiUrl + `Evaluate/EvaluateDetail?userid=${num}`
    return this.httpClient.get<EntityReponseModelL<EvaluateDetals>>(newPath)
   
  }
  getbyidevaluatoruser(num:number):Observable<EntityReponseModelL<EvaluateDetals>>{
    let newPath = this.apiUrl + `Evaluate/EvaluatorDetail?userid=${num}`
    return this.httpClient.get<EntityReponseModelL<EvaluateDetals>>(newPath)
   
  }
  getuser(id:number){
    let newPath = this.apiUrl + `UserPerformance/getbyiddetail?id=${id}`;
    return this.httpClient.get<EntityReponseModelL<UserDetail>>(newPath)
   
  }
  loggedin():boolean{
    return !!localStorage.getItem('token');
  }
  register(registerModel:Register):Observable<ReponseModel>{
    let newPath = this.apiUrl + 'UserAuth/register'
     return this.httpClient.post<ReponseModel>(newPath,registerModel)
  }
  storeToken(tokenvalue:string){
    localStorage.setItem('token',tokenvalue)
  }
  storeRefreshToken(tokenvalue:string){
    localStorage.setItem('refreshToken',tokenvalue)
  }
  getToken(){
    return localStorage.getItem('token')
  }
  getRefreshToken(){
    return localStorage.getItem('refreshToken')
  }
  signOut(name:string){
    this.locastorage.removeItem(name);
    localStorage.clear();
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
  getUserLevelFromToken(){
    if(this.userPayload)
      return this.userPayload.POSITIONLEVEL;
  }
  getUsernameFromToken(){
    if(this.userPayload)
      return this.userPayload.USERNAME;
  }
  getUserIdFromToken(){
    if(this.userPayload)
      return this.userPayload.USERID;
  }
  getTeamNameFromToken(){
    if(this.userPayload)
      return this.userPayload.TEAMNAME;
  }
  renewToken(tokenapi:TokenApiModel){
    return this.httpClient.post<any>(`${this.apiUrl}UserAuth/refresh`,tokenapi)
  }
  checkloginin(){
    if(this.loggedin()){
       this.router.navigate(['homepage'])
    }
    else{
    }
  
  }

}
