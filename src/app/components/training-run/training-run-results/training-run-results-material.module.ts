import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

/**
 * Material components import for training run results module
 */
@NgModule({
  imports: [
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  exports: [
    MatButtonModule,
    MatProgressSpinnerModule
  ]
})
export class TrainingRunResultsMaterialModule {}
