import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminmanagmentComponent } from './adminmanagment.component';

describe('AdminmanagmentComponent', () => {
  let component: AdminmanagmentComponent;
  let fixture: ComponentFixture<AdminmanagmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminmanagmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminmanagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
