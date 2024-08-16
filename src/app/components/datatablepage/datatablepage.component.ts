import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import DataTables, { Config } from 'datatables.net';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { LocalStorageService } from '../../services/local-storage.service';
import { AuthServiceService } from '../../services/auth.service.service';
import { UserStoreService } from '../../services/user-store.service';
import { UserDetail } from '../../model/UserAuth/userDetail';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-datatablepage',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './datatablepage.component.html',
  styleUrl: './datatablepage.component.css'
})
export class DatatablepageComponent implements OnInit {
  public USERNAME:string="";
  public role:string="";
  public users:any=[];
  public filteredItems:any = [];
  id!:number;
  searchTerm: string = '';
  sortColumn: keyof UserDetail = 'name';
  sortOrder: 'asc' | 'desc' = 'asc';
  
  constructor(
    private authservice:AuthServiceService,
    private storeservice:UserStoreService,

  ) {}
ngOnInit(): void {
  this.storeservice.getUserIdStore()
  .subscribe(val=>{
    const USERNAMEFromToken=this.authservice.getUserIdFromToken()
    this.id=val || USERNAMEFromToken
  });
  this.getalluser();

}
getalluser(){
  this.authservice.getalluser(this.id).subscribe((response:any)=>{
    if (response.data !=null) {
      this.users=response.data;
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
}



