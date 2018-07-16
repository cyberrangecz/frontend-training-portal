import {NgModule} from "@angular/core";
import {SharedToolbarComponent} from "./shared-toolbar/shared-toolbar.component";
import {SharedMaterialModule} from "./shared-material.module";
import {NotFoundComponent} from "./not-found/not-found.component";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    SharedToolbarComponent,
    NotFoundComponent

  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedMaterialModule
  ],
  exports: [
    SharedToolbarComponent,
    NotFoundComponent
  ]
})

export class SharedModule {

}
