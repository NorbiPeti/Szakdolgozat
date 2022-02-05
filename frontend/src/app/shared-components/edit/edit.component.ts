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
  isLoading = true;

  @Input() apiPath: string;
  @Input() fields: { title: string, name: string }[];
  formGroup: FormGroup;

  constructor(private api: ApiService, private router: Router, private fb: FormBuilder, private route: ActivatedRoute) {
  }

  async ngOnInit(): Promise<void> {
    this.item = JSON.parse(window.localStorage.getItem(this.router.url));
    window.localStorage.removeItem(this.router.url);
    const url = this.route.snapshot.url;
    if (!this.item && url[url.length - 1].path !== 'new') {
      this.item = await this.api.request('get', this.apiPath + '/' + this.route.snapshot.url[this.route.snapshot.url.length - 1], {});
    }
    this.formGroup = this.fb.group(this.fields.reduce((pv, cv) => Object.assign(pv, {[cv.name]: new FormControl()}), {}));
    if (this.item) {
      this.formGroup.patchValue(this.item);
    }
    this.isLoading = false;
  }

  async submit(): Promise<void> {
    this.isLoading = true;
    try {
      if (this.item) {
        await this.api.request('patch', this.apiPath + '/' + this.item.id, this.formGroup.value);
      } else {
        await this.api.request('post', this.apiPath, this.formGroup.value);
      }
      await this.router.navigateByUrl(this.router.url.substring(0, this.router.url.lastIndexOf('/')));
    } catch (e) {
      alert(e);
    }
    this.isLoading = false;
  }

  getType(itemElement: any): typeof itemElement {
    return typeof itemElement;
  }

}
