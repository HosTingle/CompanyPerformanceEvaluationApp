import { HttpInterceptorFn } from '@angular/common/http';
import { LocalStorageService } from '../services/local-storage.service';
import { inject } from '@angular/core';


export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const localstorage= inject(LocalStorageService);
  const myToken= localstorage.getItem("token");
  if(myToken){
    req=req.clone({
      setHeaders:{Authorization:`Bearer ${myToken}`}
    })
  }
  return next(req);

};
