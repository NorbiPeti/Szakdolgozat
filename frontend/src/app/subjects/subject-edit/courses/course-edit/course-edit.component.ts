import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomTitleComponent } from '../../../../app.component';
import {
  Course,
  CourseGQL,
  CreateCourseGQL,
  CreateFulfillmentModeGQL,
  EditCourseGQL,
  EditFulfillmentModeGQL,
  FulfillmentMode,
  FulfillmentModeGQL,
  FulfillmentModeListGQL,
  FulfillmentModeUpdateInput,
  SubjectGQL
} from '../../../../services/graphql';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.css']
})
export class CourseEditComponent implements OnInit, CustomTitleComponent {
  subjectId: string;
  itemType: Course;
  courseId: string;
  editedFulMode: FulfillmentMode;
  editingFulMode = false;
  beforeSubmit = () => ({subjectId: +this.route.snapshot.params.subjectId});

  constructor(private route: ActivatedRoute, public subjectGQL: SubjectGQL,
              public itemGQL: CourseGQL, public editGQL: EditCourseGQL, public createGQL: CreateCourseGQL,
              public modeListGQL: FulfillmentModeListGQL, public modeItemGQL: FulfillmentModeGQL, public modeEditGQL: EditFulfillmentModeGQL,
              public modeCreateGQL: CreateFulfillmentModeGQL) {
    this.subjectId = route.snapshot.params.subjectId;
    this.courseId = route.snapshot.params.id;
  }

  ngOnInit(): void {
  }

  getPageTitleVars(): object | Promise<object> {
    return this.subjectGQL.fetch({id: this.subjectId}).toPromise().then(subject => ({subjectName: subject.data.subject.name}));
  }

  async editFulMode(item: FulfillmentMode): Promise<void> {
    this.editedFulMode = item;
    this.editingFulMode = true;
  }

  async createFulMode(): Promise<void> {
    this.editedFulMode = null;
    this.editingFulMode = true;
  }

  beforeFulModeSubmit(item: FulfillmentMode): Partial<FulfillmentModeUpdateInput> {
    function thresh(prop: keyof typeof item): void {
      let val = item[prop];
      if (val < 0) {
        val = 0;
      }
      ((item[prop]) as number) = val > 1 ? val as number / 100 : +val;
    }

    thresh('threshold2');
    thresh('threshold3');
    thresh('threshold4');
    thresh('threshold5');
    return {...item, courseId: this.courseId};
  }

  submitFulMode(): void {
    this.editedFulMode = null;
    this.editingFulMode = false;
  }
}
