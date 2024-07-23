import { CommonModule, CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [HttpClientModule,DecimalPipe, DatePipe, CurrencyPipe,CommonModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit{

ngOnInit(): void {
}


}
