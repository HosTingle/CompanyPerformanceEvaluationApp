import { Component } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { DatatablepageComponent } from "../datatablepage/datatablepage.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserDetail } from '../../model/UserAuth/userDetail';
import { AuthServiceService } from '../../services/auth.service.service';
import { UserStoreService } from '../../services/user-store.service';
import{MatDialog} from '@angular/material/dialog';
import { DialogCoComponent } from '../dialog-co/dialog-co.component';

@Component({
  selector: 'app-evaluate',
  standalone: true,
  imports: [SidebarComponent, DatatablepageComponent,CommonModule,FormsModule],
  templateUrl: './evaluate.component.html',
  styleUrl: './evaluate.component.css'
})
export class EvaluateComponent {
  public USERNAME:string="";
  public role:string="";
  username:string="";
  public users:any=[];
  public userscity:any=[];
  public copyusers:any=[];
  public filteredItems:any = [];
  searchTerm: string = '';
  sortColumn: keyof UserDetail = 'name';
  sortOrder: 'asc' | 'desc' = 'asc';
  visible:boolean=false;
  selectedRole: string = '';
  selectedCity: string = '';
  selectedPerson: string = '';
  roleList: string[] = ['user', 'Stajyer', 'calisan', 'Yönetici'];
  cityList: string[] = ['İstanbul', 'Ankara', 'İzmir']; 
  userNames: string[] = [];
  constructor(
    private authservice:AuthServiceService,
    public matdialog:MatDialog
  ) {}

  clearSelections() {
    this.selectedRole = '';
    this.selectedCity = '';
    this.selectedPerson = '';
  }
  openDialog(user: UserDetail) {
    this.matdialog.open(DialogCoComponent, {
      data: user
    });
    console.log(user);
  }
  getUsers(){
    this.users=this.copyusers;
    if(this.selectedRole!='' || this.selectedCity!='' || this.selectedPerson!=''){
   
        this.users = this.users.filter((user: UserDetail) => {
          return (
            (!this.selectedCity || user.city === this.selectedCity) &&
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
  
  ngOnInit(): void {
    this.getalluser();
  }
  getalluser(){
    this.authservice.getalluser().subscribe(async (response:any)=>{
      if (response.data !=null) {
        this.users=await response.data;
        this.userNames = this.users.map((user: UserDetail)  => user.name);
        console.log(this.userNames);
        this.copyusers=this.users;
        console.log(response.data);
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
  
  
  filterItems(): void {
    this.users = this.users.filter((user: UserDetail)  => user.city === 'Ankara');
    console.log(this.filterItems)
  }
  onCitySelected(){
    this.users=this.copyusers;
    this.userscity = this.users.filter((user: UserDetail) => {
      return (
        (!this.selectedCity || user.city === this.selectedCity) &&
        (!this.selectedRole || user.role === this.selectedRole) 
      );
    });
    this.userNames = this.userscity.map((user: UserDetail)  => user.name);
  }
}
