import {NgModule} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
