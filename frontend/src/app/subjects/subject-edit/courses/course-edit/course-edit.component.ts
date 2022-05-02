import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.css']
})
export class CourseEditComponent implements OnInit {
  itemType: Course;
  beforeSubmit = () => ({subjectId: +this.route.snapshot.params.subjectId});

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
  }

}
