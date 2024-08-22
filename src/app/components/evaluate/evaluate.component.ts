import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { DatatablepageComponent } from "../datatablepage/datatablepage.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserDetail } from '../../model/UserAuth/userDetail';
import { AuthServiceService } from '../../services/auth.service.service';
import { UserStoreService } from '../../services/user-store.service';
import{MatDialog} from '@angular/material/dialog';
import { DialogCoComponent } from '../dialog-co/dialog-co.component';
import { Position } from '../../model/position';
import { PositionService } from '../../services/position.service';

@Component({
  selector: 'app-evaluate',
  standalone: true,
  imports: [SidebarComponent, DatatablepageComponent,CommonModule,FormsModule],
  templateUrl: './evaluate.component.html',
  styleUrl: './evaluate.component.css'
})
export class EvaluateComponent implements OnInit {
  public USERNAME:string="";
  public role:string="";
  teamname:string="";
  username:string="";
  id!:number;
  level!:number;
  public users:any=[];
  public userscity:any=[];
  public copyusers:any=[];
  public filterusers:any=[];
  public filteredItems:any = [];
  searchTerm: string = '';
  sortColumn: keyof UserDetail = 'name';
  sortOrder: 'asc' | 'desc' = 'asc';
  visible:boolean=false;
  selectedRole: string = '';
  selectedCity: string = '';
  selectedPerson: string = '';
  roleList: Position[] = [];
  cityList: string[] = []; 
  userNames: string[] = [];

  constructor(
    private authservice:AuthServiceService,
    public matdialog:MatDialog,
    private positionser:PositionService,
    private userstor:UserStoreService
  ) {}
  ngOnInit(): void {
    this.workstore();
    this.getalluser();
    this.getpositions();
    this.getcitys();

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
    this.onCitySelected();

  }
  openDialog(user: UserDetail) {
    this.matdialog.open(DialogCoComponent, {
      data: user
    });
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
 
        if(this.role=="Yonetici"){
          this.filterusers= this.users.filter((user: UserDetail) => {
            return (
              ( user.teamname === this.teamname)
            );
          });
          this.users= this.filterusers;
          this.userNames = this.users.map((user: UserDetail)  => user.name);
        }
        else{
          this.filterusers=this.users;
          this.userNames = this.users.map((user: UserDetail)  => user.name);
        }
        this.copyusers=this.users;
      } 
    });
 

  }
  
  get filteredUsers(): UserDetail[] {
    return this.users
      .filter((user: UserDetail) =>
        user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.phone.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.city.toLowerCase().includes(this.searchTerm.toLowerCase())
      )
      .sort((a: UserDetail, b: UserDetail) => {
        if (!this.sortColumn) return 0;
  
        const aValue = a[this.sortColumn];
        const bValue = b[this.sortColumn];
  
        if (aValue < bValue) return this.sortOrder === 'asc' ? -1 : 1;
        if (aValue > bValue) return this.sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
  }
  
  sort(column: keyof UserDetail) {
    if (this.sortColumn === column) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortOrder = 'asc';
    }
  }
  
  clearSearch() {
    this.searchTerm = '';
  }
  
  

  onCitySelected(){
    this.users= this.filterusers;
    this.userscity = this.users.filter((user: UserDetail) => {
      return (
        (!this.selectedCity || user.teamname === this.selectedCity) &&
        (!this.selectedRole || user.role === this.selectedRole) 
      );
    });
    this.userNames = this.userscity.map((user: UserDetail)  => user.name);
  }
  
}
