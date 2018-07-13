import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {DesignerRoutingModule} from "./designer-routing.module";
import {DesignerOverviewComponent} from "./designer-overview/designer-overview.component";

@NgModule({
  imports: [
    CommonModule,
    DesignerRoutingModule
  ],
  declarations: [
    DesignerOverviewComponent
  ],
  providers: [

  ]
})

export class DesignerModule {

}
