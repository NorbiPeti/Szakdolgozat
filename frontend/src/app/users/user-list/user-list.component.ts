import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  itemType = User;

  constructor() {
  }

  ngOnInit(): void {
  }

}
