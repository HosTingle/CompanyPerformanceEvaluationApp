import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCoComponent } from './dialog-co.component';

describe('DialogCoComponent', () => {
  let component: DialogCoComponent;
  let fixture: ComponentFixture<DialogCoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogCoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogCoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
