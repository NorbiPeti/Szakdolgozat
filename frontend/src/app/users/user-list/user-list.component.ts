import { Component, OnInit } from '@angular/core';
import { UserResult } from '../../services/graphql';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  itemType: UserResult;

  constructor() {
  }

  ngOnInit(): void {
  }

}
