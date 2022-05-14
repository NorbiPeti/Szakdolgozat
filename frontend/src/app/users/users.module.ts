import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { RouterModule, Routes } from '@angular/router';
import { RouteData } from '../app-routing.module';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { UserEditComponent } from './user-edit/user-edit.component';
import { AssignToCourseComponent } from './assign-to-course/assign-to-course.component';

const routes: Routes = [
  {path: '', component: UserListComponent, data: {title: ''} as RouteData},
  {path: 'assign', component: AssignToCourseComponent, data: {title: 'Hozzárendelés kurzushoz'}},
  {path: ':id', component: UserEditComponent, data: {title: 'Szerkesztés'}}
];

@NgModule({
  declarations: [UserListComponent, UserEditComponent, AssignToCourseComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedComponentsModule
  ]
})
export class UsersModule { }
