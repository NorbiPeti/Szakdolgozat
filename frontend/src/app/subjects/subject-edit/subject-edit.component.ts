import { Component, OnInit } from '@angular/core';
import { EditSubjectGQL, Subject, SubjectGQL } from '../../services/graphql';

@Component({
  selector: 'app-subject-edit',
  templateUrl: './subject-edit.component.html',
  styleUrls: ['./subject-edit.component.css']
})
export class SubjectEditComponent implements OnInit {
  itemType: Subject;

  constructor(public itemGQL: SubjectGQL, public updateGQL: EditSubjectGQL) {
  }

  ngOnInit(): void {
  }

}
