import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionspageComponent } from './questionspage.component';

describe('QuestionspageComponent', () => {
  let component: QuestionspageComponent;
  let fixture: ComponentFixture<QuestionspageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionspageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionspageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
