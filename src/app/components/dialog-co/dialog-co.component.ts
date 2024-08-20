import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { UserDetail } from '../../model/UserAuth/userDetail';
import { UserStoreService } from '../../services/user-store.service';
import { AuthServiceService } from '../../services/auth.service.service';
import { PositionService } from '../../services/position.service';
import { Evalquestion } from '../../model/evalquestion';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { DatatablepageComponent } from '../datatablepage/datatablepage.component';
import { FormsModule } from '@angular/forms';
import { Tasks } from '../../model/tasks';
import { MatMenuModule } from '@angular/material/menu';
import { Evaluate } from '../../model/evaluate';
import { EvaluateSelection } from '../../model/evaluateselection';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-co',
  standalone: true,
  imports: [MatFormFieldModule,MatInputModule,MatIconModule,CommonModule,SidebarComponent, DatatablepageComponent,FormsModule,MatMenuModule],
  templateUrl: './dialog-co.component.html',
  styleUrl: './dialog-co.component.css'
})
export class DialogCoComponent {
  constructor(
    
    private positionser:PositionService,
    public dialogRef: MatDialogRef<DialogCoComponent>,
    private userstor:UserStoreService,
    private authService:AuthServiceService,
    private router:Router,
    private toastrService: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: UserDetail
  ) {
    }

    onNoClick(): void {
      this.dialogRef.close();
    }
    
    selectedtaskid!:number;
    evaluatenumber!:number;
    id!:number;
    newTask: string = '';
    evaluateList:Evaluate[]=[];
    currentFilter: string = 'all';
    evalQuestionList: Evalquestion[] = [];
    public usertasks:Tasks[] = [];;
    public filteredItems:any = [];
    searchTerm: string = '';
    sortColumn: keyof Evalquestion = 'evaluatequestion';
    sortOrder: 'asc' | 'desc' = 'asc';
    visible:boolean=false;
    userNames: string[] = [];
    openmenu:boolean=false;
    selectedEvaluations: EvaluateSelection[] = [];
    selectedtask!:Tasks;
    ngOnInit(): void {
      this.getallEvaluateQuestion();
      this.getuser();
      this.getusertask();
    }
    toggleSelection(evaluatequestionid: number, puan: number, event: any) {
      if (event.target.checked) {
        this.selectedEvaluations.push(new EvaluateSelection(evaluatequestionid, puan));
      } else {
        const index = this.selectedEvaluations.findIndex(e => e.evaluatequestionid === evaluatequestionid);
        if (index !== -1) {
          this.selectedEvaluations.splice(index, 1);
        }
      }
    }
    viewTaskDetail(usertask: Tasks) {
      this.dialogRef.close();
      this.positionser.changeTask(usertask);
      this.router.navigate([`taskspage/${usertask.taskid}`]);
  
    }
    updatePuan(evaluatequestionid: number, puan: number) {
      const evaluation = this.selectedEvaluations.find(e => e.evaluatequestionid === evaluatequestionid);
      if (evaluation) {
        evaluation.puan = puan;
      }
    }

    get kilteruser(): Evalquestion[] {
      
      return this.evalQuestionList
        .filter((user: Evalquestion) =>
          user.evaluatequestion.toLowerCase().includes(this.searchTerm.toLowerCase()
        ))
        .sort((a: Evalquestion, b: Evalquestion) => {
          if (!this.sortColumn) return 0;
    
          const aValue = a[this.sortColumn];
          const bValue = b[this.sortColumn];
    
          if (aValue < bValue) return this.sortOrder === 'asc' ? -1 : 1;
          if (aValue > bValue) return this.sortOrder === 'asc' ? 1 : -1;
          return 0;
        });
    }
    
    sort(column: keyof Evalquestion) {
      if (this.sortColumn === column) {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortColumn = column;
        this.sortOrder = 'asc';
      }
    }
    addQuestionAnswers(){
     for (let i = 0; i < this.selectedEvaluations.length; i++) {
      const evaluate = new Evaluate();
      evaluate.evaluatorid = this.id;
      evaluate.evaluateeid = this.data.userid;
      evaluate.evalquestionid =this.selectedEvaluations[i].evaluatequestionid;
      evaluate.taskid = this.selectedtask.taskid;
      evaluate.feedbackcomment = `asdasdasd`;
      evaluate.evaluationdate = new Date();
      evaluate.evaluatescore = this.selectedEvaluations[i].puan; 
      evaluate.evaluationdate = new Date(); // Set the current date

      const month = evaluate.evaluationdate.getMonth() + 1; // getMonth() returns 0-11, so add 1 to get 1-12
      
      if (month > 6) {
        evaluate.period = "2.Dönem"; // If month is greater than 6, it's the second period
      } else {
        evaluate.period = "1.Dönem"; // If month is 6 or less, it's the first period
      }
      this.evaluateList.push(evaluate); 
    }
    this.positionser.addRangeEvaluate(this.evaluateList).
    subscribe(
      (response:any)=>{
       if (response.success) {
        this.toastrService.success('Değerlendirmeler Eklendi', 'Başarılı', {
    
        });
        this.selectedtask.iscompleted="T";
        this.positionser.updateusertask(this.selectedtask).subscribe(async (response:any)=>{
          if (response.data !=null) {
    
          } 
        });
        this.onNoClick();
       } 
       else{
        this.toastrService.error('Değerlendirmeler Eklenemedi', 'Başarısız', {
    
        });
        this.onNoClick();
       }
     });
    }
 
 
    getallEvaluateQuestion(){
      this.positionser.getEvalQuestioions().subscribe(
        (response:any)=>{
         if (response.data !=null) {
          this.evalQuestionList=response.data
         } 
       });
    }
    degerlendir(task:Tasks){
      this.selectedtask=task;
      this.visible=!this.visible;
    }
    getuser(){
      this.userstor.getUserIdStore()
      .subscribe(val=>{
        const USERNAMEFromToken=this.authService.getUserIdFromToken()
        this.id=val || USERNAMEFromToken
      });
      
     
      

      };
    getusertask(){
      this.positionser.getByIdTasks(this.data.userid).
      subscribe({
    
        next:(res)=>{
          this.usertasks=res.data;
  
        },
        error:(err)=>{
       
        }
      })

    }


  
 
  
    filterTasks(filter: string): void {
      this.currentFilter = filter;
    }
  
    filteredTasks(): Tasks[] {
      if (this.currentFilter === 'all') {
        return this.usertasks;
      } else if (this.currentFilter === 'pending') {
        return this.usertasks.filter(task => task.status === 'T');
      } else if (this.currentFilter === 'completed') {
        return this.usertasks.filter(task => task.status === 'F');
      }
      return this.usertasks;
    }

 

  }


