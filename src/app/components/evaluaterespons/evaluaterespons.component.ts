import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserStoreService } from '../../services/user-store.service';
import { AuthServiceService } from '../../services/auth.service.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { EvaluateDetals } from '../../model/evaluatedetail';
import { PositionService } from '../../services/position.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-evaluaterespons',
  standalone: true,
  imports: [SidebarComponent, CommonModule, FormsModule],
  templateUrl: './evaluaterespons.component.html',
  styleUrl: './evaluaterespons.component.css'
})
export class EvaluateresponsComponent implements OnInit {
  id!:number;
  selectedPeriod: string = '1.Dönem'; // Varsayılan dönem
  role!:string;
  selectedYear: number = 2024; // Varsayılan yıl
  respons!:any;
  uniqueTasks: any[] = [];
  score!:number;
  evaluatedetail!: EvaluateDetals[];
  evaluatedet!: EvaluateDetals[];
  groupedTasks: { [key: string]: EvaluateDetals[] } = {};
  filteredTasks: any[] = [];
  avarageScore:number=0;
  constructor(
    private router:Router,
    private localStorageService: LocalStorageService,
    private authservice:AuthServiceService,
    private storeservice:UserStoreService,
    private positionser:PositionService,
  ) {}
ngOnInit(): void {
  this.getuserfromstore();
  if(this.role=="Yonetici" ||this.role=="Ustyönetici"){
    this.getalluserEvaluator();
  }
  else{
    this.getalluserEvaluate();
  }

}
  getalluserEvaluate(){
    this.authservice.getbyidevaluateuser(this.id).subscribe((response:any)=>{
      if (response.data !=null) {
        this.evaluatedet=response.data;
        this.filterAndGroupTasks();
      } 
    });
  }
  getalluserEvaluator(){
    this.authservice.getbyidevaluatoruser(this.id).subscribe((response:any)=>{
      if (response.data !=null) {
        this.evaluatedet=response.data;
        this.filterAndGroupTasks();
      } 
    });
  }
  getuserfromstore(){
    this.storeservice.getRoleFromStore()
    .subscribe(val=>{
      const getRoleFromToken=this.authservice.getRoleFromToken();
      this.role=val || getRoleFromToken
    })
    this.storeservice.getUserIdStore()
    .subscribe(val=>{
      const USERNAMEFromToken=this.authservice.getUserIdFromToken()
      this.id=val || USERNAMEFromToken
    });
  }
  filterAndGroupTasks() {
    const taskMap = new Map<string, any[]>();
    
    // Verileri filtrele
    this.filteredTasks = this.evaluatedet.filter(task => {
      const taskYear = new Date(task.evaluationdate).getFullYear();
      return task.period === this.selectedPeriod && taskYear === this.selectedYear;
    });
  
    // Görevleri grupla
    for (let task of this.filteredTasks) {
      const key = `${task.taskname}-${task.period}`; 
      if (!taskMap.has(key)) {
        taskMap.set(key, []);
      }
      taskMap.get(key)?.push(task);
    }
  
    // Gruplandırılmış görevler
    this.uniqueTasks = Array.from(taskMap.values()).map(tasks => tasks[0]);
    this.groupedTasks = Object.fromEntries(taskMap);
  
    // Ortalama puanı hesapla
    let totalScore = 0;
    let taskCount = 0;
  
    for (const key in this.groupedTasks) {
      const tasks = this.groupedTasks[key];
      const total = tasks.reduce((sum, task) => sum + task.evaluatescore, 0);
      const average = total / tasks.length;
  
      totalScore += average;
      taskCount++;
    }
  
    // Ortalama puanı hesapla ve güncelle
    this.avarageScore = (totalScore / taskCount) * 10;
    console.log('Average Score:', this.avarageScore);
  }
  

  routeevaluate(idd:number,name:string,period:string){
    this.evaluatedetail = this.groupedTasks[`${name}-${period}`];
    this.positionser.changeEvaluateL(this.evaluatedetail);
    this.router.navigate([`evalresdetail/${idd}`]);
  }
  
}
