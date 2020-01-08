import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatCardModule, MatCheckboxModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule, MatRadioModule,
  MatSidenavModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule
} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatTableModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatSidenavModule,
    MatTreeModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatStepperModule,
    MatCheckboxModule,
    MatMenuModule,
    MatDividerModule,
    MatRadioModule,
    MatButtonModule,
    MatCardModule,
    MatTooltipModule,
    MatExpansionModule
  ],
  exports: [
    CommonModule,
    MatTableModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatSidenavModule,
    MatTreeModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatStepperModule,
    MatCheckboxModule,
    MatMenuModule,
    MatDividerModule,
    MatRadioModule,
    MatButtonModule,
    MatCardModule,
    MatTooltipModule,
    MatExpansionModule
  ]
})
/**
 * Helper mock module for automatic import of all material components
 */
export class MaterialTestingModule { }
