import { Injectable } from '@angular/core';
import { ApiUrl } from '../constants/api-url';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';
import { ReponseModel } from '../model/responseModels/responseModel';
import { UserDetail } from '../model/UserAuth/userDetail';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = ApiUrl.localurl;
  private userPayload:any;
  constructor(private httpClient:HttpClient,
    private locastorage:LocalStorageService,
    private router:Router
  ) { 
  }
  updateuserinfo(userdet:UserDetail){
      let newPath = this.apiUrl + 'UserPerformance/UpdateUserInfo'
       return this.httpClient.post<ReponseModel>(newPath,userdet)
  }
  deletalluserinformation(userdet:UserDetail){
    let newPath = this.apiUrl + `UserPerformance/DeleteUserInfo`;
    return this.httpClient.post<ReponseModel>(newPath,userdet)
  }
}
