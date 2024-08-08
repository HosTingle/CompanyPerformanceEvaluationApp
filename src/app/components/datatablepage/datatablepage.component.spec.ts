import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatablepageComponent } from './datatablepage.component';

describe('DatatablepageComponent', () => {
  let component: DatatablepageComponent;
  let fixture: ComponentFixture<DatatablepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatatablepageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatatablepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
