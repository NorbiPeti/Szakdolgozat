import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CoursesComponent } from './courses/courses.component';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule, Routes } from '@angular/router';
import { RouteData } from '../app-routing.module';

const routes: Routes = [
  {path: '', component: DashboardComponent, data: {title: 'Kezdőlap'} as RouteData},
  {path: 'courses', component: CoursesComponent, data: {title: 'Kurzusok'}}
];

@NgModule({
  declarations: [DashboardComponent, CoursesComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressBarModule,
    RouterModule.forChild(routes)
  ]
})
export class StudentsModule {
}
