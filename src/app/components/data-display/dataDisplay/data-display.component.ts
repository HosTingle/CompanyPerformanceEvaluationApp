import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import {DecimalPipe, DatePipe, CurrencyPipe, CommonModule} from '@angular/common';
import { UserService } from '../../../services/user.service';
import { UserTable } from '../../../model/UserTable/userTable';
import { Router } from '@angular/router';
@Component({
  selector: 'app-data-display',
  standalone: true,
  imports: [HttpClientModule,DecimalPipe, DatePipe, CurrencyPipe,CommonModule],
  templateUrl: './data-display.component.html',
  styleUrl: './data-display.component.css'
})
export class DataDisplayComponent implements OnInit{
  constructor(
    private router:Router,
  ) {
    
  }
ngOnInit(): void {
}

logout(){
  this.router.navigate(["loginpage"]);
}
}
