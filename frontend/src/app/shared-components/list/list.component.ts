import { Component, Input, OnInit, Type } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { PaginationData } from '../../utility/pagination-data';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent<T> implements OnInit {

  @Input() apiPath: string;
  @Input() itemType: Type<T>;
  @Input() columns: {title: string, prop: keyof T}[];

  paginationData: PaginationData = {};
  items: T[] = [];
  loading = false;

  constructor(private api: ApiService) {
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
      const total = await this.api.requestItemCount(this.apiPath);
      this.paginationData.page = page;
      this.paginationData.limit = limit;
      this.paginationData.total = total;
      this.items = await this.api.requestPage<T>(this.apiPath, limit, page);
    } finally {
      this.loading = false;
    }
  }

}
