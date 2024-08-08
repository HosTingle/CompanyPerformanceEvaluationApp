import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupadressComponent } from './signupadress.component';

describe('SignupadressComponent', () => {
  let component: SignupadressComponent;
  let fixture: ComponentFixture<SignupadressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupadressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupadressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
