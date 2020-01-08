import {NgModule} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

/**
 * Material component imports for training instance overview module
 */
@NgModule({
  imports: [
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatDialogModule,
    MatIconModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressBarModule,
    MatProgressSpinnerModule
  ],
  exports: [
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatDialogModule,
    MatIconModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressBarModule,
    MatProgressSpinnerModule
  ]
})
export class TrainingInstanceOverviewMaterialModule {

}
