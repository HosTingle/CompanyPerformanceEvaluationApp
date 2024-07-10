import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import {DecimalPipe, DatePipe, CurrencyPipe, CommonModule} from '@angular/common';
import { UserService } from '../../../services/user.service';
import { UserTable } from '../../../model/UserTable/userTable';
@Component({
  selector: 'app-data-display',
  standalone: true,
  imports: [HttpClientModule,DecimalPipe, DatePipe, CurrencyPipe,CommonModule],
  templateUrl: './data-display.component.html',
  styleUrl: './data-display.component.css'
})
export class DataDisplayComponent implements OnInit{
  datas:UserTable[]=[];
  constructor(private userService:UserService) {
    
  }
ngOnInit(): void {
this.fetchData()
}

fetchData(){
  this.userService.fetchdata().subscribe((response:any)=>{
    console.log(response);
    this.datas=response;
  });
}
}
