import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthServiceService } from '../../services/auth.service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { Register } from '../../model/UserAuth/register';
@Component({
  selector: 'app-signupadress',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './signupadress.component.html',
  styleUrl: './signupadress.component.css'
})
export class SignupadressComponent implements OnInit{
  userRegisterAddressForm!: FormGroup;
  reg!:Register;
  cities = [
    {
      name: 'İstanbul',
      districts: [
        'Arnavutköy', 'Ataşehir', 'Avcılar', 'Bağcılar', 'Bahçelievler', 'Bakırköy', 'Başakşehir', 'Bayrampaşa', 
        'Beşiktaş', 'Beykoz', 'Beylikdüzü', 'Beyoğlu', 'Büyükçekmece', 'Çatalca', 'Çekmeköy', 'Esenler', 'Esenyurt', 
        'Eyüpsultan', 'Fatih', 'Gaziosmanpaşa', 'Güngören', 'Kadıköy', 'Kağıthane', 'Kartal', 'Küçükçekmece', 'Maltepe', 
        'Pendik', 'Sancaktepe', 'Sarıyer', 'Silivri', 'Sultanbeyli', 'Sultangazi', 'Şile', 'Şişli', 'Tuzla', 
        'Ümraniye', 'Üsküdar'
      ]
    },
    {
      name: 'Ankara',
      districts: [
        'Altındağ', 'Çankaya', 'Etimesgut', 'Keçiören', 'Mamak', 'Sincan', 'Yenimahalle', 'Akyurt', 'Ayaş', 'Bala', 
        'Beypazarı', 'Çamlıdere', 'Çubuk', 'Elmadağ', 'Evren', 'Gölbaşı', 'Güdül', 'Haymana', 'Kalecik', 'Kazan', 
        'Kızılcahamam', 'Nallıhan', 'Polatlı', 'Şereflikoçhisar'
      ]
    }
  ];
  filteredDistricts: string[] = [];
  constructor(
    private authService: AuthServiceService,
    private formBuilder: FormBuilder,
    private router:Router,
    private toastrService: ToastrService,
  ) {}
  
  ngOnInit(): void {
    this.authService.checkloginin();
    this.createUserRegisterForm();
    this.reg=this.authService.getMyClassInstance();
    this.onCityChange();
  }
  createUserRegisterForm() { 
    this.userRegisterAddressForm= this.formBuilder.group({
      country: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      addressDetail: ['', Validators.required],
    });
  }
  assigndata(){
    if (!this.reg) {
      this.reg = new Register();
    }
    this.reg.addressDetail= this.userRegisterAddressForm.get('addressDetail')?.value;
    this.reg.city= this.userRegisterAddressForm.get('city')?.value;
    this.reg.country = this.userRegisterAddressForm.get('country')?.value;
    this.reg.state= this.userRegisterAddressForm.get('state')?.value;
    this.reg.status= "T";
  }
  onCityChange() {
    this.userRegisterAddressForm.get('city')?.valueChanges.subscribe(selectedCity => {
      const city = this.cities.find(c => c.name === selectedCity);
      this.filteredDistricts = city ? city.districts : [];
      this.userRegisterAddressForm.get('state')?.setValue(''); // İlçe seçimini sıfırla
    });
  }
  register() {
    this.assigndata();
    const isAnyEmpty = Object.values(this.reg).some(value => value === null || value === undefined || value === '')
    if(isAnyEmpty){
      this.toastrService.error('Lütfen bilgileri giriniz!', 'Başarısız', {
        positionClass: 'toast-bottom-center' // Burada konumu belirleyebilirsiniz
      });
    }
    else{ 
      this.authService.register(this.reg).subscribe((response:any)=>{
        if (response.success) {
          this.toastrService.success(response.message, 'Başarili', {  
            positionClass: 'toast-bottom-center' // Burada konumu belirleyebilirsiniz
          });
          this.router.navigate(["loginpage"]);
        } else {
          this.toastrService.error('Giriş Başarisiz', 'Doğrulama Hatasi', {
            positionClass: 'toast-bottom-center' // Burada konumu belirleyebilirsiniz
          });
        }
       });
    }
}
}
