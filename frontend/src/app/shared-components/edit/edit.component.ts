import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Model } from '../../model/model';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent<T extends Model> implements OnInit {

  item?: T;

  @Input() apiPath: string;
  @Input() fields: { title: string, name: string }[];
  formGroup: FormGroup;

  constructor(private api: ApiService, private router: Router, private fb: FormBuilder, private route: ActivatedRoute) {
  }

  async ngOnInit(): Promise<void> {
    this.item = JSON.parse(window.localStorage.getItem(this.router.url));
    window.localStorage.removeItem(this.router.url);
    if (!this.item) {
      this.item = await this.api.request('get', this.apiPath + '/' + this.route.snapshot.url[this.route.snapshot.url.length - 1], {});
    }
    this.formGroup = this.fb.group(this.fields.reduce((pv, cv) => Object.assign(pv, {[cv.name]: new FormControl()}), {}));
    this.formGroup.patchValue(this.item);
  }

  async submit(): Promise<void> {
    try {
      await this.api.request('patch', this.apiPath + '/' + this.item.id, this.formGroup.value);
    } catch (e) {
      alert(e);
    }
  }

}
