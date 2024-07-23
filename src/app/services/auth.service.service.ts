import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../model/login';
import { ApiUrl } from '../constants/api-url';
import { Observable, Subject } from 'rxjs';
import { EntityReponseModel } from '../model/entityResponseModel';
import { Token } from '../model/token';
import { Register } from '../model/register';
import { ReponseModel } from '../model/responseModel';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  apiUrl = ApiUrl.GetUserTable;
  constructor(private httpClient:HttpClient) { }
  private loggedIn:boolean = false;
  isLoggedInChanged = new Subject<boolean>();

  login(loginModel:Login):Observable<EntityReponseModel<Token>>{
    let newPath = this.apiUrl + 'UserAuth/login'
     return this.httpClient.post<EntityReponseModel<Token>>(newPath,loginModel)
  }
  loggedin(){
    this.loggedIn = true;
    this.isLoggedInChanged.next(true);
  }
  register(registerModel:Register):Observable<ReponseModel>{
    let newPath = this.apiUrl + 'UserAuth/register'
     return this.httpClient.post<ReponseModel>(newPath,registerModel)
  }

}
