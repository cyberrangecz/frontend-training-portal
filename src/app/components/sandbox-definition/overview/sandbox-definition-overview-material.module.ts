import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';

/**
 * Material component imports for sandbox definition overview module
 */
@NgModule({
  imports: [
    MatButtonModule,
    MatDialogModule
  ],
  exports: [
    MatButtonModule,
    MatDialogModule
  ]
})
export class SandboxDefinitionOverviewMaterialModule {}
