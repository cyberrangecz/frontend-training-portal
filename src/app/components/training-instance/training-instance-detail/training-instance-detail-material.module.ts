import {NgModule} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

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
export class TrainingInstanceDetailMaterialModule {

}
