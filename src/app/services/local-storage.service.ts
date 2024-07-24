import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }


  setItem(key:string, value:string){

    return localStorage.setItem(key,value)
  }

  getItem(key:string){
    
    return localStorage.getItem(key)
  }

  removeItem(key:string){

    return localStorage.removeItem(key)
  }
}