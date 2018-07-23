import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import { LevelConfigurationComponent } from './level-configuration.component';
import {LevelConfigurationMaterialModule} from "./level-configuration-material.module";
import {LevelConfigurationRoutingModule} from "./level-configuration-routing.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LevelConfigurationMaterialModule,
    LevelConfigurationRoutingModule
  ],
  declarations: [

  LevelConfigurationComponent],
  providers: [

  ]
})

export class LevelConfigurationModule {

}
