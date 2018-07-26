import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { CombinedViewComponent } from './combined-view.component';
import {ScoreDevelopmentViewMaterialModule} from "../score-development-view/score-development-view-material.module";
import {ScoreDevelopmentViewRoutingModule} from "../score-development-view/score-development-view-routing.module";

@NgModule({
  imports: [
    CommonModule,
    ScoreDevelopmentViewMaterialModule,
    ScoreDevelopmentViewRoutingModule
  ],
  declarations: [
  CombinedViewComponent
  ],
  providers: [
  ]
})

export class CombinedViewModule {

}
