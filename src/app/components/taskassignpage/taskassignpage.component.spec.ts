import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskassignpageComponent } from './taskassignpage.component';

describe('TaskassignpageComponent', () => {
  let component: TaskassignpageComponent;
  let fixture: ComponentFixture<TaskassignpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskassignpageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskassignpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
