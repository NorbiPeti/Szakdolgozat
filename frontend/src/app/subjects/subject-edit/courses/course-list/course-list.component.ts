import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../../../model/course.model';

@Component({
  selector: 'app-courses',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  subjectId: string;
  itemType = Course;

  constructor(route: ActivatedRoute) {
    this.subjectId = route.snapshot.params.subjectId;
  }

  ngOnInit(): void {
  }

}
