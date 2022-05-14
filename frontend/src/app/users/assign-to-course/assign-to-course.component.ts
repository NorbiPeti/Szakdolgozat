import { Component, OnInit } from '@angular/core';
import { CourseAssignUserGQL, User, UserListGQL } from '../../services/graphql';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-assign-to-course',
  templateUrl: './assign-to-course.component.html',
  styleUrls: ['./assign-to-course.component.css']
})
export class AssignToCourseComponent implements OnInit {
  itemType: User;

  constructor(public listGQL: UserListGQL, public assignGQL: CourseAssignUserGQL, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
  }

  async assignAsTeacher(item: User): Promise<void> { // TODO: Remove assigned users from list
    await this.assignGQL.mutate({course: this.route.snapshot.queryParams.course, user: item.id + '', role: 'teacher'}).toPromise();
  }

  async assignAsStudent(item: User): Promise<void> {
    await this.assignGQL.mutate({course: this.route.snapshot.queryParams.course, user: item.id + '', role: 'student'}).toPromise();
  }
}
