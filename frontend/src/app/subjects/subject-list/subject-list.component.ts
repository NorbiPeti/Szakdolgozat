import { Component, OnInit } from '@angular/core';
import { Subject } from '../../model/subject.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.css']
})
export class SubjectListComponent implements OnInit {
  itemType = Subject;

  constructor(private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
  }

  listCourses = (subject: Subject): void => {
    this.router.navigate([subject.id, 'courses'], {relativeTo: this.route});
  };

}
