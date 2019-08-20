import {NgModule} from '@angular/core';
import {MatButtonModule, MatIconModule, MatSnackBarModule, MatTabsModule} from "@angular/material";

@NgModule({

  imports: [
    MatIconModule,
    MatTabsModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  exports: [
    MatIconModule,
    MatTabsModule,
    MatButtonModule,
    MatSnackBarModule,
  ]
})
export class AdminGroupMaterialModule {

}
