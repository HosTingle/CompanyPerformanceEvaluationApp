import { Component } from '@angular/core';
import { AuthServiceService } from '../../services/auth.service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserStoreService } from '../../services/user-store.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-questionspage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './questionspage.component.html',
  styleUrl: './questionspage.component.css'
})
export class QuestionspageComponent {
  id!:number;
  public user:any=[];
  role!:string;
  pagetut:boolean=true;
  constructor(
    private authService: AuthServiceService,
    private activitatedRoute:ActivatedRoute,
    
    private toast:ToastrService,
    private router:Router,
    private userstor:UserStoreService,
 
  ) {}
  ngOnInit(): void {
    this.getuser();
  };
  logout(){
    this.authService.signOut("token");
  }
  openother(){
    this.pagetut= !this.pagetut
  }
  navigateedit(){
    this.router.navigate(["editpage"]);
  }
  getuser(){
    this.userstor.getUserIdStore()
  .subscribe(val=>{
    const USERNAMEFromToken=this.authService.getUserIdFromToken()
    this.id=val || USERNAMEFromToken
  });
  this.userstor.getRoleFromStore()
  .subscribe(val=>{
    const getRoleFromToken=this.authService.getRoleFromToken();
    this.role=val || getRoleFromToken
  })
    this.authService.getuser(this.id).subscribe({
      
      next:(res)=>{
        this.user=res.data

      },
      error:(err)=>{
        this.toast.error('Bilgiler yüklenemedi.', 'Başarısız', {
          positionClass: 'toast-bottom-center' // Burada konumu belirleyebilirsiniz
        });
      }
    })
  }
}
