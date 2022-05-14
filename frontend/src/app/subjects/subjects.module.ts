import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubjectListComponent } from './subject-list/subject-list.component';
import { SubjectEditComponent } from './subject-edit/subject-edit.component';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { RouterModule, Routes } from '@angular/router';
import { RouteData } from '../app-routing.module';
import { CourseListComponent } from './subject-edit/courses/course-list/course-list.component';
import { CourseEditComponent } from './subject-edit/courses/course-edit/course-edit.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

const routes: Routes = [
  {path: '', component: SubjectListComponent, data: {title: ''} as RouteData},
  {path: ':id', component: SubjectEditComponent, data: {title: 'Szerkesztés'}},
  {
    path: ':subjectId/courses', data: {title: ':subjectName'}, children: [
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
    RouterModule.forChild(routes),
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule
  ]
})
export class SubjectsModule {
}
