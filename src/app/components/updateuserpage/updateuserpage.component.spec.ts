import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateuserpageComponent } from './updateuserpage.component';

describe('UpdateuserpageComponent', () => {
  let component: UpdateuserpageComponent;
  let fixture: ComponentFixture<UpdateuserpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateuserpageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateuserpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
