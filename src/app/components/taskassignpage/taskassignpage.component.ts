import { Component } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { AuthServiceService } from '../../services/auth.service.service';
import { MatDialog } from '@angular/material/dialog';
import { PositionService } from '../../services/position.service';
import { UserStoreService } from '../../services/user-store.service';
import { Router } from '@angular/router';
import { UserDetail } from '../../model/UserAuth/userDetail';
import { Tasks } from '../../model/tasks';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-taskassignpage',
  standalone: true,
  imports: [SidebarComponent,CommonModule,ReactiveFormsModule,MatIconModule],
  templateUrl: './taskassignpage.component.html',
  styleUrl: './taskassignpage.component.css'
})
export class TaskassignpageComponent {
  user!:UserDetail;
  usertask!:Tasks;
  currentScreen: number = 1; // Başlangıçta ilk ekranı göster
  taskForm!: FormGroup;
  score!:number;
  public usertasks:Tasks[] = [];
  predefinedTasks: { title: string, description: string[] }[] = [
    { title: 'Giriş Özelliği', description: [
      'Güvenli bir kullanıcı giriş sistemi tasarlama ve uygulama, kullanıcı verilerini koruma.',
      'Kullanıcı kimlik doğrulaması geliştirme, kullanıcıların sistemde güvenli bir şekilde oturum açmasını sağlama.'
    ] },
    { title: 'Veritabanı Şeması', description: [
      'Veritabanı tablolarının yapısını ve ilişkilerini tasarlama, veri modelini oluşturma.',
      'Tablolar arasındaki ilişkileri ve veri bütünlüğünü sağlama, veritabanı şemasını oluşturma ve optimize etme.'
    ] },
    { title: 'Sorgu Performansını Optimize Etme', description: [
      'Veritabanı sorgularını inceleyerek performans sorunlarını tespit etme ve iyileştirme yapma.',
      'Sorgu performansını artırmak için indeksleme, sorgu optimizasyonu ve diğer teknikler kullanma.'
    ] },
    { title: 'REST API Geliştirme', description: [
      'RESTful API uç noktalarını oluşturma ve geliştirme, veri erişim noktaları sağlam.',
      'API’nin veri bütünlüğünü ve güvenliğini sağlama, çeşitli işlemler için gerekli olan işlevleri sağlama.'
    ] },
    { title: 'UI/UX Tasarım İncelemesi', description: [
      'Kullanıcı arayüzü (UI) ve kullanıcı deneyimini (UX) analiz etme, mevcut tasarımı değerlendirme.',
      'Kullanıcı deneyimini iyileştirmek için tasarım değişiklikleri ve iyileştirmeler uygulama.'
    ] },
    { title: 'Birim Testleri Yazma', description: [
      'Kodun farklı bölümlerini test etmek için birim testleri oluşturma, yazılımın her biriminde doğru çalıştığını doğrulama.',
      'Yazılımın güvenilirliğini ve kalitesini artırmak için test senaryoları geliştirme ve uygulama.'
    ] },
    { title: 'Uygulama Dağıtımı', description: [
      'Uygulamayı bulut ortamına dağıtma, uygun bulut servis sağlayıcılarını kullanarak dağıtım sürecini gerçekleştirme.',
      'Dağıtım ortamını yapılandırma, uygulamanın çalışmasını ve erişilebilirliğini sağlama.'
    ] },
    { title: 'Önbellekleme Uygulama', description: [
      'Uygulamanın performansını artırmak için önbellekleme mekanizmaları ekleme.',
      'Veri erişim sürelerini azaltarak kullanıcı deneyimini iyileştirme.'
    ] },
    { title: 'Kod İncelemesi Yapma', description: [
      'Kodun kalitesini ve standartlara uygunluğunu değerlendirmek için detaylı bir kod incelemesi yapma.',
      'Kodun güvenilirliğini ve sürdürülebilirliğini sağlamak amacıyla gerekli düzeltmeleri yapma.'
    ] },
    { title: 'Ödeme Geçidi Entegrasyonu', description: [
      'Ödeme sistemleriyle entegre olarak ödeme geçidini uygulama ve yapılandırma.',
      'Kullanıcıların çevrimiçi ödemeleri güvenli bir şekilde gerçekleştirmelerini sağlama ve işlem güvenliğini sağlama.'
    ] }
  ];
  userNames: string[] = [];
  id!:number;
  countF!:number;
  countT!:number;
  toplams!:number;
  public copyusers:any=[];
  public users:any=[];
  availableDescriptions: string[] = [];
  constructor(
    private positionser:PositionService,
    private router:Router,
    private formBuilder: FormBuilder,
    private toastrService:ToastrService,
    private userstor:UserStoreService,
    private authservice:AuthServiceService,
  ) {}
  ngOnInit() {
    this.initializeForm()
    this.getuser()
    const savedTask = localStorage.getItem('userka');
  if (savedTask) {
    this.user = JSON.parse(savedTask);
  } else {
    this.getusertask();
  }
  }
  getuser(){
    this.userstor.getUserIdStore()
    .subscribe(val=>{
      const USERNAMEFromToken=this.authservice.getUserIdFromToken()
      this.id=val || USERNAMEFromToken
    });
    this.positionser.currentUser.subscribe(user => {
      if (user) {
        this.user = user;
        this.id=this.user.userid
        localStorage.setItem('userka', JSON.stringify(user));
      }
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
  getusertask(){
    this.positionser.currentUser.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem('userka', JSON.stringify(user));
      }
    });
  }
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
  onTaskTitleChange(event: any): void {
    const selectedTitle = event.target.value;
    this.updateDescriptions(selectedTitle);
  }
  updateDescriptions(selectedTitle: string): void {
    const selectedTask = this.predefinedTasks.find(task => task.title === selectedTitle);
    if (selectedTask) {
      this.availableDescriptions = selectedTask.description;
      this.taskForm.get('taskDescription')?.setValue(this.availableDescriptions[0]); // Set default description
    } else {
      this.availableDescriptions = [];
    }
  }
  initializeForm(){
    this.taskForm = this.formBuilder.group({
      taskTitle: ['', Validators.required],
      taskDescription: ['', Validators.required],
      taskEndDate: ['', Validators.required]
    });
  }
  ngOnDestroy() {
    localStorage.removeItem('userka');
  }
  addusertask(){
    if (!this.usertask) {
      this.usertask = new Tasks();
    }
    this.usertask.userid=this.user.userid;
    this.usertask.taskname=this.taskForm.get('taskTitle')?.value;
    this.usertask.duedate=this.taskForm.get('taskEndDate')?.value;
    this.usertask.description=this.taskForm.get('taskDescription')?.value;
    this.usertask.iscompleted='F';
    this.usertask.status='T';
    this.positionser.addusertask(this.usertask).subscribe(response => {
      if (response.success) {
        this.toastrService.success('Görev eklendi', 'Başarılı', {

        }); 
        this.router.navigate([`usermanagment`]);
      }
      else{
        this.toastrService.error('Görev eklenirken bir hata oluştu daha sonra tekrar deneyiniz', 'Başarısız', { 

        }); 
      }
    });
  }
  onSubmit(): void {
    if (this.taskForm.valid) {
      const taskData = this.taskForm.value;
      console.log('Task Data:', taskData);
      // Form submit işlemleri burada yapılabilir
    } else {
      console.log('Form is invalid');
    }
  }
  showScreen(screenNumber: number): void {
    this.currentScreen = screenNumber;
  }
  viewTaskDetail(usertask: Tasks) {
    this.positionser.changeTask(usertask);
    this.router.navigate([`taskspage/${usertask.taskid}`]);

  }

}
