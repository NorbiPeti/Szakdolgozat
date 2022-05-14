import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


@NgModule({
  declarations: [TableComponent, ListComponent, EditComponent],
  exports: [
    TableComponent,
    ListComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    MatProgressBarModule,
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class SharedComponentsModule {
}
