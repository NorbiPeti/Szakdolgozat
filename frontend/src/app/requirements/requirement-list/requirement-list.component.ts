import { Component, OnInit } from '@angular/core';
import { RequirementListGQL } from '../../services/graphql';

@Component({
  selector: 'app-requirement-list',
  templateUrl: './requirement-list.component.html',
  styleUrls: ['./requirement-list.component.css']
})
export class RequirementListComponent implements OnInit {

  constructor(public listGQL: RequirementListGQL) {
  }

  ngOnInit(): void {
  }

}
