import { Component, OnInit } from '@angular/core';
import { EvaluateDetals } from '../../model/evaluatedetail';
import { PositionService } from '../../services/position.service';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-evaluaterespdetail',
  standalone: true,
  imports: [SidebarComponent, CommonModule,],
  templateUrl: './evaluaterespdetail.component.html',
  styleUrl: './evaluaterespdetail.component.css'
})
export class EvaluaterespdetailComponent implements OnInit  {
  EvaluateDetails:EvaluateDetals[] = [];;
  constructor(private positionser:PositionService,
  ) {}
  ngOnInit(): void {
    const savedTask = localStorage.getItem('userevaluate');
    if (savedTask) {
      this.EvaluateDetails = JSON.parse(savedTask);
    } else {
      this.getuserEvaluateDetail()
    }

  }
  getuserEvaluateDetail(){
    this.positionser.currentEvaluates.subscribe(EvaluateDetails => {
      if (EvaluateDetails) {
        
        this.EvaluateDetails = EvaluateDetails;
        localStorage.setItem('userevaluate', JSON.stringify(EvaluateDetails));
      }
    });
  }
  ngOnDestroy() {
    localStorage.removeItem('userevaluate');
  }
}
