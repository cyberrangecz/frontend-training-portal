import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {DesignerRoutingModule} from "./designer-routing.module";
import {DesignerOverviewComponent} from "./designer-overview/designer-overview.component";
import {DesignerMaterialModule} from "./designer-material.module";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    DesignerRoutingModule,
    DesignerMaterialModule,
    SharedModule
  ],
  declarations: [
    DesignerOverviewComponent
  ],
  providers: [

  ]
})

export class DesignerModule {

}
