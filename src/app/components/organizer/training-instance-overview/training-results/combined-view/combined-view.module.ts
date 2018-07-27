import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { CombinedViewComponent } from './combined-view.component';
import {CombinedViewMaterialModule} from "./combined-view-material.module";
import {CombinedViewRoutingModule} from "./combined-view-routing.module";

@NgModule({
  imports: [
    CommonModule,
    CombinedViewMaterialModule,
    CombinedViewRoutingModule
  ],
  declarations: [
  CombinedViewComponent
  ],
  providers: [
  ]
})

export class CombinedViewModule {

}
