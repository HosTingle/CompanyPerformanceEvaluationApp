import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserteamComponent } from './userteam.component';

describe('UserteamComponent', () => {
  let component: UserteamComponent;
  let fixture: ComponentFixture<UserteamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserteamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserteamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
