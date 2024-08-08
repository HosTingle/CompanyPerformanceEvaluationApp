import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { UserDetail } from '../../model/UserAuth/userDetail';
import { UserStoreService } from '../../services/user-store.service';
import { AuthServiceService } from '../../services/auth.service.service';

@Component({
  selector: 'app-dialog-co',
  standalone: true,
  imports: [MatFormFieldModule,MatInputModule,MatIconModule,CommonModule],
  templateUrl: './dialog-co.component.html',
  styleUrl: './dialog-co.component.css'
})
export class DialogCoComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogCoComponent>,
    private authservice:AuthServiceService,
    private storeservice:UserStoreService,
    @Inject(MAT_DIALOG_DATA) public data: UserDetail
  ) {
    }

    onNoClick(): void {
      this.dialogRef.close();
    }
    public USERNAME:string="";
    public role:string="";
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
  
    clearSelections() {
      this.selectedRole = '';
      this.selectedCity = '';
      this.selectedPerson = '';
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
