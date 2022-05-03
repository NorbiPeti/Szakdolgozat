import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomTitleComponent } from '../../../../app.component';
import { Course, SubjectGQL } from '../../../../services/graphql';

@Component({
  selector: 'app-courses',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit, CustomTitleComponent {
  subjectId: string;
  itemType: Course;

  constructor(route: ActivatedRoute, public listGQL: SubjectGQL) {
    this.subjectId = route.snapshot.params.subjectId;
  }

  ngOnInit(): void {
  }

  getPageTitle(): string {
    return 'Custom title'; //TODO: SubjectGQL
  }
}
