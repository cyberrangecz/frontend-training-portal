import {NgModule} from "@angular/core";
import {MatIconModule, MatTabsModule} from "@angular/material";

@NgModule({
  imports: [
    MatTabsModule,
    MatIconModule
  ],
  exports: [
    MatTabsModule,
    MatIconModule
  ]
})
export class TrainingInstanceOverviewMaterialModule {

}
