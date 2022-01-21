import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { RouterModule, Routes } from '@angular/router';
import { RouteData } from '../app-routing.module';
import { SharedComponentsModule } from '../shared-components/shared-components.module';

const routes: Routes = [
  {path: '', component: UserListComponent, data: {title: 'Felhasználók'} as RouteData}
];

@NgModule({
  declarations: [UserListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedComponentsModule
  ]
})
export class UsersModule { }
