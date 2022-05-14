import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PaginationData } from '../../utility/pagination-data';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent<T> implements OnInit {

  @Input() showHeader = false;
  @Input() items: T[] = [];
  @Input() loading = false;
  @Input() columns: { title: string, prop: string, type?: string }[] = [];
  @Input() paginationData: PaginationData = {page: 1, limit: 10};
  @Input() customActions: { icon: string, label: string, action: (model: T) => void }[] = [];
  @Input() allowEditing = true;

  @Output() pageChange = new EventEmitter<PageEvent>();
  @Output() editItem = new EventEmitter<T>();

  constructor() {
  }

  ngOnInit(): void {
    if (typeof this.allowEditing === 'string') {
      throw new Error('use [allowEditing]');
    }
  }

  getPropNames(): string[] {
    return this.columns.map(col => col.prop).concat('actions');
  }

  getType(field: typeof TableComponent.prototype.columns[number] | null, value: any): typeof value | string {
    return field?.type ?? typeof value;
  }
}


