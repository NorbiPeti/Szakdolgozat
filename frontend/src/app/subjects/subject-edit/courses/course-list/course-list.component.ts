import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../../../model/course.model';
import { ListComponent } from '../../../../shared-components/list/list.component';
import { CustomTitleComponent } from '../../../../app.component';

@Component({
  selector: 'app-courses',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit, CustomTitleComponent {
  subjectId: string;
  itemType = Course;
  @ViewChild('list') list: ListComponent<Course>;

  constructor(route: ActivatedRoute) {
    this.subjectId = route.snapshot.params.subjectId;
  }

  ngOnInit(): void {
  }

  getPageTitle(): string {
    return 'Custom title'; //TODO
  }
}
