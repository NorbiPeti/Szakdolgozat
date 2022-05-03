import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, SubjectListGQL } from '../../services/graphql';

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.css']
})
export class SubjectListComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, public listGQL: SubjectListGQL) {
  }

  ngOnInit(): void {
  }

  listCourses = (subject: Subject): void => {
    this.router.navigate([subject.id, 'courses'], {relativeTo: this.route});
  };

}
