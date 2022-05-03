import { Component, OnInit } from '@angular/core';
import { Subject, SubjectGQL } from '../../services/graphql';

@Component({
  selector: 'app-subject-edit',
  templateUrl: './subject-edit.component.html',
  styleUrls: ['./subject-edit.component.css']
})
export class SubjectEditComponent implements OnInit {
  itemType: Subject;

  constructor(public itemGQL: SubjectGQL) {
  }

  ngOnInit(): void {
  }

}
