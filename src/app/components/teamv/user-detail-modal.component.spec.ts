import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailModalComponent } from './user-detail-modal.component';

describe('UserDetailModalComponent', () => {
  let component: UserDetailModalComponent;
  let fixture: ComponentFixture<UserDetailModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDetailModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
