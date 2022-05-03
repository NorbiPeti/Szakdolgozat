import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../auth/login.service';
import { UserResult } from '../../services/graphql';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  itemType: UserResult;
  isEditingSelf = user => user.id === this.userService.user.id;

  constructor(private userService: LoginService) { }

  ngOnInit(): void {
  }

}
