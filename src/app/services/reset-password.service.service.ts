import { Injectable } from '@angular/core';
import { ApiUrl } from '../constants/api-url';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';
import { EntityReponseModel } from '../model/responseModels/entityResponseModel';
import { Observable } from 'rxjs/internal/Observable';
import { ReponseModel } from '../model/responseModels/responseModel';
import { ResetPassword } from '../model/UserAuth/resetPasswordModel';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordServiceService {
  apiUrl = ApiUrl.localurl;
  constructor(private httpClient:HttpClient,
    private locastorage:LocalStorageService,
    private router:Router
  ) { 
  }
  sendResetPasswordLink(email:string):Observable<ReponseModel>{
    let newPath = this.apiUrl + `UserAuth/send-rest-email/${email}`
     return this.httpClient.post<ReponseModel>(newPath,email) 
  }
  resetPassword(resetPasswordobj:ResetPassword):Observable<ReponseModel>{
        let newPath = this.apiUrl + 'UserAuth/rest-password'
    return this.httpClient.post<ReponseModel>(newPath,resetPasswordobj);
  }
}
