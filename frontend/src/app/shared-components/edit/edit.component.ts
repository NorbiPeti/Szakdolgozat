import { Component, Input, OnInit, Type } from '@angular/core';
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
  creating = false;
  isLoading = true;

  @Input() apiPath: string;
  @Input() fields: { title: string, name: keyof T, readonly?: (item: T) => boolean }[];
  @Input() itemType: Type<T>;
  /**
   * Beküldés előtt extra adat hozzáadása
   */
  @Input() beforeSubmit: (item: T) => Partial<T>;
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
    this.formGroup = this.fb.group(this.fields.reduce((pv, cv) => {
      const control = new FormControl();
      if (cv.readonly && cv.readonly(this.item)) {
        control.disable();
      }
      return Object.assign(pv, {[cv.name]: control});
    }, {}));
    if (this.item) {
      this.formGroup.patchValue(this.item);
    } else {
      this.item = new this.itemType();
      this.creating = true;
    }
    this.isLoading = false;
  }

  async submit(): Promise<void> {
    this.isLoading = true;
    const value = Object.assign({}, this.formGroup.value, this.beforeSubmit(this.item) ?? {});
    try {
      if (this.item && !this.creating) {
        await this.api.request('patch', this.apiPath + '/' + this.item.id, value);
      } else {
        await this.api.request('post', this.apiPath, value);
      }
      await this.router.navigate(['..'], {relativeTo: this.route});
    } catch (e) {
      alert(e.message);
    }
    this.isLoading = false;
  }

  getType(itemElement: any): typeof itemElement {
    return typeof itemElement;
  }

}
