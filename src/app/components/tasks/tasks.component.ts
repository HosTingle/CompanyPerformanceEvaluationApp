import { Component } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserDetail } from '../../model/UserAuth/userDetail';
import { Position } from '../../model/position';
import { AuthServiceService } from '../../services/auth.service.service';
import { MatDialog } from '@angular/material/dialog';
import { PositionService } from '../../services/position.service';
import { Tasks } from '../../model/tasks';
import { UserStoreService } from '../../services/user-store.service';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [SidebarComponent,CommonModule,FormsModule,MatIconModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
  public USERNAME:string="";
  public role:string="";
  username:string="";
  id!:number;
  countF!:number;
  countT!:number;
  public users:any=[];
  public usertasks:Tasks[] = [];
  public userscity:any=[];
  public copyusers:any=[];
  toplams!:number;
  public filteredItems:any = [];
  searchTerm: string = '';
  sortColumn: keyof UserDetail = 'name';
  sortOrder: 'asc' | 'desc' = 'asc';

  userNames: string[] = [];
  path!:string;
  constructor(
    private authservice:AuthServiceService,
    public matdialog:MatDialog,
    private positionser:PositionService,
    private userstor:UserStoreService,
    private router:Router,
  ) {}
  ngOnInit(): void {
    this.getuser();
  }
  clearSearch() {
    this.searchTerm = '';
  }
  
  getuser(){
    this.userstor.getUserIdStore()
    .subscribe(val=>{
      const USERNAMEFromToken=this.authservice.getUserIdFromToken()
      this.id=val || USERNAMEFromToken
    });
    
   
      this.positionser.getByIdTasks(this.id).
      subscribe({
    
        next:(res)=>{
        this.usertasks=res.data;
          this.toplams=this.usertasks.length;
         this.countF = this.usertasks.filter(task => task.status === 'F').length;
          this.countT = this.usertasks.filter(task => task.status === 'T').length;
        },
        error:(err)=>{
       
        }
      })


    };
  taskfinish(usertask:Tasks){
    usertask.status="F";
    this.countF = this.usertasks.filter(task => task.status === 'F').length;
    this.countT = this.usertasks.filter(task => task.status === 'T').length;
    this.positionser.updateusertask(usertask).subscribe(async (response:any)=>{
      if (response.data !=null) {
        this.users=await response.data;
        this.userNames = this.users.map((user: UserDetail)  => user.name);
        this.copyusers=this.users;

      } 
    });
  }
  viewTaskDetail(usertask: Tasks) {
    this.positionser.changeTask(usertask);
    this.router.navigate([`taskspage/${usertask.taskid}`]);

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
  
}
