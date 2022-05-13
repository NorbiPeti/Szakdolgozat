import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequirementListComponent } from './requirement-list/requirement-list.component';
import { SharedComponentsModule } from '../shared-components/shared-components.module';


@NgModule({
  declarations: [RequirementListComponent],
  imports: [
    CommonModule,
    SharedComponentsModule
  ]
})
export class RequirementsModule {
}
