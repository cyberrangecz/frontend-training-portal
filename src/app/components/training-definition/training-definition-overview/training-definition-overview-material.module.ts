import {NgModule} from '@angular/core';
import {MatProgressBarModule} from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

/**
 * Material components imports for training definition overview
 */
@NgModule({
  imports: [
    MatDividerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatProgressBarModule,
  ],
  exports: [
    MatDividerModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatProgressBarModule,
  ]
})
export class TrainingDefinitionOverviewMaterialModule {}
