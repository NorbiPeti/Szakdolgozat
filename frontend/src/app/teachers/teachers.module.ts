import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { RouteData } from '../app-routing.module';
import { MatCardModule } from '@angular/material/card';

const routes: Routes = [
  {path: '', component: DashboardComponent, data: {title: 'Kezdőlap'} as RouteData}
];

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule
  ]
})
export class TeachersModule {
}
