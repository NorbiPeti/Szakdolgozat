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
  @Input() columns: { title: string, prop: string }[] = [];
  @Input() paginationData: PaginationData = {page: 1, limit: 10};

  @Output() pageChange = new EventEmitter<PageEvent>();
  @Output() editItem = new EventEmitter<T>();

  constructor() {
  }

  ngOnInit(): void {
  }

  getPropNames(): string[] {
    return this.columns.map(col => col.prop).concat('actions');
  }
}


