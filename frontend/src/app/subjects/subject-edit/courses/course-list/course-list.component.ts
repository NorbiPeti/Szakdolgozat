import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomTitleComponent } from '../../../../app.component';
import { Course, CourseListBySubjectGQL, SubjectGQL } from '../../../../services/graphql';

@Component({
  selector: 'app-courses',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit, CustomTitleComponent {
  subjectId: string;
  itemType: Course;

  constructor(route: ActivatedRoute, public subjectGQL: SubjectGQL, public listGQL: CourseListBySubjectGQL) {
    this.subjectId = route.snapshot.params.subjectId;
  }

  ngOnInit(): void {
  }

  getPageTitleVars(): object | Promise<object> {
    return this.subjectGQL.fetch({id: this.subjectId}).toPromise().then(subject => ({subjectName: subject.data.subject.name}));
  }
}
