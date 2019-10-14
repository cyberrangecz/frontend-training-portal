import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
  imports: [
    MatButtonModule,
    MatCardModule,
    MatProgressBarModule,
    MatIconModule,
    MatExpansionModule,
    MatTooltipModule,
    ScrollingModule,
  ],
  exports: [
    MatButtonModule,
    MatCardModule,
    MatProgressBarModule,
    MatIconModule,
    MatTooltipModule,
    MatExpansionModule,
    ScrollingModule
  ]
})
export class PoolRequestDetailMaterialModule {

}
