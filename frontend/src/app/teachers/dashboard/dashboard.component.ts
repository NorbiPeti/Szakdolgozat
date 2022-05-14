import { Component, OnInit } from '@angular/core';
import { CourseListByUserGQL } from '../../services/graphql';
import { LoginService } from '../../auth/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public courses: CourseListByUserGQL, public loginService: LoginService) {
  }

  ngOnInit(): void {
  }

}
