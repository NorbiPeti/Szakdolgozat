import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubjectListComponent } from './subject-list/subject-list.component';
import { SubjectEditComponent } from './subject-edit/subject-edit.component';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { RouterModule, Routes } from '@angular/router';
import { RouteData } from '../app-routing.module';

const routes: Routes = [
  {path: '', component: SubjectListComponent, data: {title: 'Tárgyak'} as RouteData},
  {path: ':id', component: SubjectEditComponent, data: {title: 'Szerkesztés'}}
];

@NgModule({
  declarations: [SubjectListComponent, SubjectEditComponent],
  imports: [
    CommonModule,
    SharedComponentsModule,
    RouterModule.forChild(routes)
  ]
})
export class SubjectsModule {
}
