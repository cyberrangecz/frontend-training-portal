import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';

/**
 * Material components for pool request detail module
 */
@NgModule({
  imports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatExpansionModule,
    MatTooltipModule,
    ScrollingModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    MatExpansionModule,
    ScrollingModule,
    MatProgressSpinnerModule
  ]
})
export class PoolRequestDetailMaterialModule {

}
