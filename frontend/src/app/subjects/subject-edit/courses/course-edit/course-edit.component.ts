import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomTitleComponent } from '../../../../app.component';
import { Course, CourseGQL, EditCourseGQL, SubjectGQL } from '../../../../services/graphql';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.css']
})
export class CourseEditComponent implements OnInit, CustomTitleComponent {
  subjectId: string;
  itemType: Course;
  beforeSubmit = () => ({subjectId: +this.route.snapshot.params.subjectId});

  constructor(private route: ActivatedRoute, public subjectGQL: SubjectGQL, public itemGQL: CourseGQL, public editGQL: EditCourseGQL) {
    this.subjectId = route.snapshot.params.subjectId;
  }

  ngOnInit(): void {
  }

  getPageTitleVars(): object | Promise<object> {
    return this.subjectGQL.fetch({id: this.subjectId}).toPromise().then(subject => ({subjectName: subject.data.subject.name}));
  }

}
