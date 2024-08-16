import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
  private USERNAME$=new BehaviorSubject<string>("");
  private POSITIONNAME$=new BehaviorSubject<string>("");
  private TEAMNAME$=new BehaviorSubject<string>("");
  private POSITIONLEVEL$=new BehaviorSubject<number>(0);
  private USERID$ = new BehaviorSubject<number>(0); 
  constructor() {

    
   }

  public getRoleFromStore(){
    return this.POSITIONNAME$.asObservable();
  }
  public getLevelFromStore(){
    return this.POSITIONLEVEL$.asObservable();
  }
  public setRoleForStore(POSITIONNAME:string){
    this.POSITIONNAME$.next(POSITIONNAME);
  }
  public setPositionLevelForStore(POSITIONLEVEL:number){
    this.POSITIONLEVEL$.next(POSITIONLEVEL);
  }
  public getFullNammeFromStore(){
    return this.USERNAME$.asObservable();
  }
  public setFullNameForStore(USERNAME:string){
    this.USERNAME$.next(USERNAME);
  }
  public getUserIdStore(){
    return this.USERID$.asObservable();
  }
  public setUserIdStore(USERID:number){
    this.USERID$.next(USERID);
  }
  public setTeamNameStore(TEAMNAME:string){
    this.TEAMNAME$.next(TEAMNAME);
  }
  public getTeamNameStore(){
    return this.TEAMNAME$.asObservable();
  }
}
