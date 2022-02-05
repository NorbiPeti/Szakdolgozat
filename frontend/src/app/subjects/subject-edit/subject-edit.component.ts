import { Component, OnInit } from '@angular/core';
import { Subject } from '../../model/subject.model';

@Component({
  selector: 'app-subject-edit',
  templateUrl: './subject-edit.component.html',
  styleUrls: ['./subject-edit.component.css']
})
export class SubjectEditComponent implements OnInit {
  itemType = Subject;

  constructor() { }

  ngOnInit(): void {
  }

}
