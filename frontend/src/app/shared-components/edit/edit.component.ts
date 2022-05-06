import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Mutation, Query } from 'apollo-angular';
import { noop } from 'rxjs';
import { HasID, MutationInput, QueryResult } from '../../utility/types';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent<T extends HasID, QT extends QueryResult<T>, UT extends QueryResult<T>, CT extends QueryResult<T>, MI extends Partial<T>>
  implements OnInit {

  item?: T;
  creating = false;
  isLoading = true;

  @Input() gql: Query<QT, HasID>;
  @Input() updateMutation: Mutation<UT, MutationInput<MI, T>>;
  @Input() createMutation: Mutation<CT, MutationInput<MI, T>>;
  @Input() fields: { title: string, name: keyof T, readonly?: (item: T) => boolean }[];
  @Input() itemType: T;
  /**
   * Beküldés előtt extra adat hozzáadása
   */
  @Input() beforeSubmit: (item: T) => Partial<T>;
  formGroup: FormGroup;

  private key: string;
  private id: string;

  constructor(private router: Router, private fb: FormBuilder, private route: ActivatedRoute) {
  }

  async ngOnInit(): Promise<void> {
    window.localStorage.removeItem(this.router.url);
    const url = this.route.snapshot.url;
    this.id = this.route.snapshot.url[this.route.snapshot.url.length - 1] + '';
    if (!this.item && url[url.length - 1].path !== 'new') {
      const data = (await this.gql.fetch({id: this.id}).toPromise()).data;
      this.key = Object.keys(data).filter(k => k !== '__typename')[0];
      this.item = data[this.key];
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
      this.item = {} as T;
      this.creating = true;
    }
    this.isLoading = false;
  }

  async submit(): Promise<void> {
    this.isLoading = true;
    const input = Object.assign({}, this.formGroup.value, (this.beforeSubmit ?? noop)(this.item) ?? {}, {id: this.id}) as MI;
    try {
      if (this.item && !this.creating) {
        await this.updateMutation.mutate({input}).toPromise();
      } else {
        await this.createMutation.mutate({input}).toPromise();
      }
      await this.router.navigate(['..'], {relativeTo: this.route});
    } catch (e) {
      alert(e.message);
    } // TODO: Clear/update cache
    this.isLoading = false;
  }

  getType(itemElement: any): typeof itemElement {
    return typeof itemElement;
  }

}
