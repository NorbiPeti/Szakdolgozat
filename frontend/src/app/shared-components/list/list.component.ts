import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { PaginationData } from '../../utility/pagination-data';
import { Router } from '@angular/router';
import { Query } from 'apollo-angular';
import { ListVariableType } from '../../utility/types';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent<T extends { id: number }, U extends { [entityName: string]: { count: number; list: T[] } },
  V extends object | undefined> implements OnInit {

  @Input() gql: Query<U, ListVariableType<V>>;
  @Input() queryVariables: V;
  @Input() itemType: T; // TODO: Remove
  @Input() columns: { title: string, prop: keyof T }[];
  @Input() allowNew = false;
  @Input() customActions: { icon: string, label: string, action: (model: T) => void }[] = [];
  @Input() allowEditing = true;

  paginationData: PaginationData = {};
  items: T[] = [];
  loading = false;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.getItems(10, 1).catch(e => console.error(e));
  }

  async handlePageChange(event: PageEvent): Promise<void> {
    await this.getItems(event.pageSize, event.pageIndex + 1);
  }

  async getItems(limit: number, page: number): Promise<void> {
    try {
      this.loading = true;
      const vars = (this.queryVariables === undefined ? {} : this.queryVariables) as V extends object ? V : {};
      const {data} = await this.gql.fetch({...vars, limit, offset: (page - 1) * limit}).toPromise(); // TODO: Watch
      const key = Object.keys(data).filter(k => k !== '__typename')[0];
      this.paginationData.total = data[key].count;
      this.paginationData.page = page;
      this.paginationData.limit = limit;
      this.items = data[key].list;
    } finally {
      this.loading = false;
    }
  }

  async editItem(item: T): Promise<void> {
    window.localStorage.setItem(this.router.url + '/' + item.id, JSON.stringify(item)); // TODO: Apollo cache
    await this.router.navigate([this.router.url, item.id]);
  }

  async newItem(): Promise<void> {
    await this.router.navigate([this.router.url, 'new']);
  }
}
