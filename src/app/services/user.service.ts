import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../model/listResponseModel';
import { UserTable } from '../model/UserTable/userTable';
import { ApiUrl } from '../constants/api-url';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl=ApiUrl.GetUserTable+"UserAuth/login";
  constructor(private httpClient:HttpClient) {
    
   }

   fetchdata():Observable<ListResponseModel<UserTable>>{
    return this.httpClient.get<ListResponseModel<UserTable>>(this.apiUrl);
   } 
}
