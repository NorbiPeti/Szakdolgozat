import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user.model';
import { LoginService } from '../../auth/login.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  itemType = User;
  isEditingSelf = user => user.id === this.userService.user.id;

  constructor(private userService: LoginService) { }

  ngOnInit(): void {
  }

}
