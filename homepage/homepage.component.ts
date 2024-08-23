import { CommonModule, CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../services/auth.service.service';
import { UserStoreService } from '../../services/user-store.service';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { UserDetail } from '../../model/UserAuth/userDetail';
import { DialogCoComponent } from '../dialog-co/dialog-co.component';
import { PositionService } from '../../services/position.service';
import { MatDialog } from '@angular/material/dialog';
import { Position } from '../../model/position';
import { EvaluateDetals } from '../../model/evaluatedetail';
import { Tasks } from '../../model/tasks';
import { count } from 'console';
@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [HttpClientModule, DecimalPipe, DatePipe, CurrencyPipe, CommonModule, SidebarComponent,BaseChartDirective],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit{
  title = 'ng2-charts-demo';

  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [ '2006', '2007', '2008', '2009', '2010', '2011', '2012' ],
    datasets: [
      { data: [ 65, 59, 80, 81, 56, 55, 40 ], label: 'Series A' },
      { data: [ 28, 48, 40, 19, 86, 27, 90 ], label: 'Series B' }
    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };
  title2 = 'ng2-charts-demo';

  // Pie
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  public pieChartLabels = [ [ 'Bekleyen'], [ 'Tamamlanan' ], 'Değerlendirilen' ];
  public pieChartDatasets = [ {
    data: [ 0, 0, 0 ]
  } ];
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public USERNAME:string="";
  public role:string="";
  public users:any=[];
  userlenght!:number;
  teamname:string="";
  username:string="";
  id!:number;
  level!:number;
  public userscity:any=[];
  public copyusers:any=[];
  public filterusers:any=[];
  public filteredItems:any = [];
  searchTerm: string = '';

  visible:boolean=false;
  selectedRole: string = '';
  selectedCity: string = '';
  selectedPerson: string = '';
  roleList: Position[] = [];
  cityList: string[] = []; 
  userNames: string[] = [];
  selectedPeriod: string = '1.Dönem'; // Varsayılan dönem
  evaluatecounter!:number;
  selectedYear: number = 2024; // Varsayılan yıl
  respons!:any;
  countF!:number;
  countT!:number;
  countC!:number;
  uniqueTasks: any[] = [];
  usertasks:Tasks[] = [];
  evaluatedetail!: EvaluateDetals[];
  evaluatedet!: EvaluateDetals[];
  groupedTasks: { [key: string]: EvaluateDetals[] } = {};
  filteredTasks: any[] = [];
  constructor(
    private authservice:AuthServiceService,
    public matdialog:MatDialog,
    private positionser:PositionService,
    private userstor:UserStoreService,
  ) {}
  ngOnInit(): void {
    this.workstore();
    this.getalluser();
    this.getpositions();
    this.getcitys();
    if(this.role=="Yonetici" || this.role=="Ustyönetici"){
      this.getalluserEvaluator();
    }
    else{
      this.getalluserEvaluate();
    }
    this.degerlendiren();
  }
  degerlendiren(){
    this.positionser.getByIdTasks(this.id).
      subscribe({
    
        next:(res)=>{
        this.usertasks=res.data;
         this.countF = this.usertasks.filter(task => task.status === 'F').length;
          this.countT = this.usertasks.filter(task => task.status === 'T').length;
                 this.countC = this.usertasks.filter(task => task.iscompleted === 'T').length;

                  this.pieChartDatasets = [ {
                  data: [ this.countC, this.countF, this.countT ]
                } ];
        },
        error:(err)=>{
       
        }
      })
  }
  workstore(){
    this.userstor.getUserIdStore()
    .subscribe(val=>{
      const USERNAMEFromToken=this.authservice.getUserIdFromToken()
      this.id=val || USERNAMEFromToken
    });
    this.userstor.getRoleFromStore()
  .subscribe(val=>{
    const getRoleFromToken=this.authservice.getRoleFromToken();
    this.role=val || getRoleFromToken
  })
  this.userstor.getTeamNameStore()
  .subscribe(val=>{
    const getTeamNameFromToken=this.authservice.getTeamNameFromToken();
    this.teamname=val || getTeamNameFromToken
  });
  this.userstor.getLevelFromStore()
  .subscribe(val=>{
    const getUserLevelFromToken=this.authservice.getUserLevelFromToken();
    this.level=val || getUserLevelFromToken
  });
  }
  clearSelections() {

    this.selectedRole = '';
    this.selectedCity = '';
    this.selectedPerson = '';


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
  filterAndGroupTasks() {
    const taskMap = new Map<string, any[]>();
    const periodScores: { [year: string]: { [period: string]: number } } = {};
  
    // Verileri filtreleyin
    this.filteredTasks = this.evaluatedet.filter(task => {
      const taskYear = new Date(task.evaluationdate).getFullYear();
      return task.period === this.selectedPeriod && taskYear === this.selectedYear;
    });
  
    this.evaluatecounter = this.evaluatedet.length;
  
    for (let task of this.filteredTasks) {
      const key = `${task.taskname}-${task.period}`; 
      if (!taskMap.has(key)) {
        taskMap.set(key, []);
      }
      taskMap.get(key)?.push(task);
    }
  
    // `uniqueTasks` ve `groupedTasks` güncellemesi
    this.uniqueTasks = Array.from(taskMap.values()).map(tasks => tasks[0]);
    this.groupedTasks = Object.fromEntries(taskMap);
  
    // Verileri döneme göre ortalama puanlara dönüştürme
    this.updateBarChartData();
  }
  
  updateBarChartData() {
    const periodScores: { [year: string]: { [period: string]: number } } = {};
  
    // `filteredTasks` verilerini yıllara ve dönemlere göre gruplayın
    for (const task of this.evaluatedet) {
      const year = new Date(task.evaluationdate).getFullYear();
      const period = task.period;
      const score = task.evaluatescore;
  
      if (!periodScores[year]) {
        periodScores[year] = { '1.Dönem': 0, '2.Dönem': 0 };
      }
  
      periodScores[year][period] = (periodScores[year][period] || 0) + score;
    }
  
    // Ortalama hesapla
    for (const year in periodScores) {
      const periods = periodScores[year];
      const period1Count = this.evaluatedet.filter(task => new Date(task.evaluationdate).getFullYear() === Number(year) && task.period === '1.Dönem').length;
      const period2Count = this.evaluatedet.filter(task => new Date(task.evaluationdate).getFullYear() === Number(year) && task.period === '2.Dönem').length;
  
      if (period1Count > 0) {
        periodScores[year]['1.Dönem'] /= period1Count;
      }
      if (period2Count > 0) {
        periodScores[year]['2.Dönem'] /= period2Count;
      }
    }
  
    // Bar chart verilerini güncelle
    const years = Object.keys(periodScores);
    const period1Data = [];
    const period2Data = [];
  
    for (const year of years) {
      period1Data.push(periodScores[year]['1.Dönem'] || 0);
      period2Data.push(periodScores[year]['2.Dönem'] || 0);
    }
  
    this.barChartData = {
      labels: years,
      datasets: [
        { data: period1Data, label: '1.Dönem' },
        { data: period2Data, label: '2.Dönem' }
      ]
    };
  }
  getpositions(){
    this.positionser.getPositions().subscribe(
       (response:any)=>{
        if (response.data !=null) {
          this.roleList= response.data;
        } 
      });
  }
  getcitys(){
    this.positionser.getCityList().subscribe(
       (response:any)=>{
        if (response.data !=null) {
          this.cityList= response.data;
        } 
      });
  }
  getUsers(){
    this.users=this.copyusers;
    if(this.selectedRole!='' || this.selectedCity!='' || this.selectedPerson!=''){
   
        this.users = this.users.filter((user: UserDetail) => {
          return (
            (!this.selectedCity || user.teamname === this.selectedCity) &&
            (!this.selectedRole || user.role === this.selectedRole) &&
            (!this.selectedPerson || user.name === this.selectedPerson)
          );
        });
    }
    else if(this.copyusers.length != 0){
      this.users=this.copyusers
    }
    this.visible=true;
  }


  getalluser(){
    this.authservice.getalluser(this.id).subscribe(async (response:any)=>{
      if (response.data !=null) {
        this.users=await response.data;
 
        if(this.role!="Ustyönetici"){
          this.filterusers= this.users.filter((user: UserDetail) => {
            return (
              ( user.teamname === this.teamname)
            );
          });
          this.users= this.filterusers;
          this.userNames = this.users.map((user: UserDetail)  => user.name);
          this.userlenght=this.users.length;
        }
        else{
          this.filterusers=this.users;
          this.userNames = this.users.map((user: UserDetail)  => user.name);
          this.userlenght=this.users.length;
        }
        this.copyusers=this.users;
      } 
    });
 

  }
  


}
