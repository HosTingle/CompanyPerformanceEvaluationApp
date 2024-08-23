import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Tasks } from '../../model/tasks';
import { AuthServiceService } from '../../services/auth.service.service';
import { PositionService } from '../../services/position.service';
import { UserStoreService } from '../../services/user-store.service';
@Component({
  selector: 'app-taskdetail',
  standalone: true,
  imports: [SidebarComponent,CommonModule,MatIconModule],
  templateUrl: './taskdetail.component.html',
  styleUrl: './taskdetail.component.css'
})
export class TaskdetailComponent implements OnInit {
  usertask!:Tasks;
  constructor(private positionser:PositionService,
  ) {}
  ngOnInit() {
    const savedTask = localStorage.getItem('usertask');
  if (savedTask) {
    this.usertask = JSON.parse(savedTask);
  } else {
    this.getusertask();
  }
  }
  getusertask(){
    this.positionser.currentTask.subscribe(task => {
      if (task) {
        
        this.usertask = task;
        localStorage.setItem('usertask', JSON.stringify(task));
      }
    });
  }
  ngOnDestroy() {
    localStorage.removeItem('usertask');
  }

}
