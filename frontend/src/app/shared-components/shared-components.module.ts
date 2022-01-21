import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ListComponent } from './list/list.component';



@NgModule({
  declarations: [TableComponent, ListComponent],
  exports: [
    TableComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    MatProgressBarModule,
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class SharedComponentsModule { }
