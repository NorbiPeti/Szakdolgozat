import { Component, OnInit } from '@angular/core';
import { Subject } from '../../model/subject.model';

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.css']
})
export class SubjectListComponent implements OnInit {
  itemType = Subject;

  constructor() { }

  ngOnInit(): void {
  }

}
