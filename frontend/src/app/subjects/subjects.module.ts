import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubjectListComponent } from './subject-list/subject-list.component';
import { SubjectEditComponent } from './subject-edit/subject-edit.component';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { RouterModule, Routes } from '@angular/router';
import { RouteData } from '../app-routing.module';
import { CourseListComponent } from './subject-edit/courses/course-list/course-list.component';
import { CourseEditComponent } from './subject-edit/courses/course-edit/course-edit.component';

const routes: Routes = [
  {path: '', component: SubjectListComponent, data: {title: 'Tárgyak'} as RouteData},
  {path: ':id', component: SubjectEditComponent, data: {title: 'Szerkesztés'}},
  {
    path: ':subjectId/courses', children: [
      {path: ':id', component: CourseEditComponent, data: {title: 'Szerkesztés'} as RouteData},
      {path: '', component: CourseListComponent, data: {title: 'Kurzusok'}}
    ]
  }
];

@NgModule({
  declarations: [SubjectListComponent, SubjectEditComponent, CourseListComponent, CourseEditComponent],
  imports: [
    CommonModule,
    SharedComponentsModule,
    RouterModule.forChild(routes)
  ]
})
export class SubjectsModule {
}
