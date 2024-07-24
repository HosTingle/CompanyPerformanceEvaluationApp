import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthServiceService } from '../services/auth.service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthServiceService);
  const tostr=inject(ToastrService);
  const router = inject(Router);
  if(authService.loggedin()){
    return true ;
  }
  else{
    router.navigate(['loginpage']);
    return false;
  }

};
