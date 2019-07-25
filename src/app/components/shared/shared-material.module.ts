import {NgModule} from "@angular/core";
import { MatBadgeModule } from "@angular/material/badge";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatCardModule } from "@angular/material/card";
import { MatRippleModule } from "@angular/material/core";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import {MatCheckboxModule, MatInputModule, MatPaginatorModule, MatTableModule} from '@angular/material';

@NgModule({
  imports: [
    MatToolbarModule,
    MatSidenavModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatButtonToggleModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatBadgeModule,
    MatRippleModule,
    MatTooltipModule,
    MatDialogModule,
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatInputModule
  ],
  exports: [
    MatToolbarModule,
    MatSidenavModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatButtonToggleModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatBadgeModule,
    MatRippleModule,
    MatTooltipModule,
    MatDialogModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatInputModule,
    MatTableModule
  ]
})

export class SharedMaterialModule {

}
