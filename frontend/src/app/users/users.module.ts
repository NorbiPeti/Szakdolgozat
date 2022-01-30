import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { RouterModule, Routes } from '@angular/router';
import { RouteData } from '../app-routing.module';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { UserEditComponent } from './user-edit/user-edit.component';

const routes: Routes = [
  {path: '', component: UserListComponent, data: {title: 'Felhasználók'} as RouteData},
  {path: ':id', component: UserEditComponent, data: {title: 'Szerkesztés'}}
];

@NgModule({
  declarations: [UserListComponent, UserEditComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedComponentsModule
  ]
})
export class UsersModule { }
