import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import { LevelConfigurationComponent } from './level-configuration.component';
import {LevelConfigurationMaterialModule} from "./level-configuration-material.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LevelConfigurationMaterialModule
  ],
  exports: [
    LevelConfigurationComponent
  ],
  declarations: [
  LevelConfigurationComponent
  ],
  providers: [

  ]
})

export class LevelConfigurationModule {

}
