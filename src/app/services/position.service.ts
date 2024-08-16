import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiUrl } from '../constants/api-url';
import { Position } from '../model/position';
import { EntityReponseModelL } from '../model/responseModels/entityListResponseModel';
import { Evalquestion } from '../model/evalquestion';
import { Tasks } from '../model/tasks';
import { Evaluate } from '../model/evaluate';
import { EntityReponseModel } from '../model/responseModels/entityResponseModel';
import { ReponseModel } from '../model/responseModels/responseModel';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PositionService {
  private taskSource = new BehaviorSubject<Tasks | null>(null);
  currentTask = this.taskSource.asObservable();
  apiUrl = ApiUrl.localurl;
  constructor(
    private httpClient:HttpClient,
    private locastorage:LocalStorageService,
    private router:Router
  ) { }
  getPositions(){
    let newPath = this.apiUrl + `Position/getall`;
    return this.httpClient.get<EntityReponseModelL<Position>>(newPath)
   
  }
  getCityList(){
    let newPath = this.apiUrl + `UserPerformance/getallTeamList`;
    return this.httpClient.get<EntityReponseModelL<string>>(newPath)
  }
  getEvalQuestioions(){
    let newPath = this.apiUrl + `EvaluateQuestion/getall`;
    return this.httpClient.get<EntityReponseModelL<Evalquestion>>(newPath)
  }
  getByIdTasks(id:number){
    let newPath = this.apiUrl + `UserTask/getallbyid?id=${id}`;
    return this.httpClient.get<EntityReponseModelL<Tasks>>(newPath)
  }
  addRangeEvaluate(evaluate: Evaluate[]):Observable<ReponseModel>{
    let newPath = this.apiUrl + `Evaluate/addRange`;
    return this.httpClient.post<ReponseModel>(newPath,evaluate)
  }
  changeTask(task: Tasks) {
    this.taskSource.next(task);
  }
  updateusertask(usetask:Tasks){
    let newPath = this.apiUrl + `UserTask/update`;
    return this.httpClient.post<ReponseModel>(newPath,usetask)
  }
}
