import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { LocalStorageService } from '../services/local-storage.service';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TokenApiModel } from '../model/UserAuth/tokenApiModel';
import { AuthServiceService } from '../services/auth.service.service';


export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const localstorage= inject(LocalStorageService);
  const toast= inject(ToastrService);
  const auth= inject(AuthServiceService);
  const route= inject(Router);
  const myToken= localstorage.getItem("token");
  if(myToken){
    req=req.clone({
      setHeaders:{Authorization:`Bearer ${myToken}`}
    })
  }
  return next(req).pipe(
    catchError((err:any)=>{
       if(err instanceof HttpErrorResponse){
        if(err.status==401){
         /* toast.warning('Warning', 'Token süresi bitti', {
            positionClass: 'toast-bottom-center' 
          });
          localstorage.removeItem('token');
          route.navigate(['loginpage'])*/
          let tokeApiModel = new TokenApiModel();
          tokeApiModel.accessToken= auth.getToken()!;
          tokeApiModel.refreshToken =auth.getRefreshToken()!;
          return auth.renewToken(tokeApiModel)
          .pipe(
              switchMap((data:TokenApiModel)=>{
              auth.storeRefreshToken(data.refreshToken);
              auth.storeToken(data.accessToken);
              localstorage.setItem('token',data.accessToken);
              req = req.clone({
                setHeaders: {Authorization:`Bearer ${data.accessToken}`}  // "Bearer "+myToken
              })
              return next(req);
            }),
            catchError((err)=>{
              return throwError(()=>{
                toast.warning('Warning', 'Token süresi bitti', {
                  positionClass: 'toast-bottom-center' 
                });
                route.navigate(['loginpage'])
              })
            })
          )
        }
       }
       return throwError(()=> new Error('Some other error occured'))
    }
  )
  )


};

