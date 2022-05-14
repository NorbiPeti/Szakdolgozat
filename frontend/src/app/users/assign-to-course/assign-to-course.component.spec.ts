import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignToCourseComponent } from './assign-to-course.component';

describe('AssignToCourseComponent', () => {
  let component: AssignToCourseComponent;
  let fixture: ComponentFixture<AssignToCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssignToCourseComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignToCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
