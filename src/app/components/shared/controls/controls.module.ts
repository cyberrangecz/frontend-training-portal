import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {ControlsComponent} from './controls.component';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {BasicControlButtonComponent} from './basic-control-button/basic-control-button.component';
import {ExpandableControlButtonComponent} from './expandable-control-button/expandable-control-button.component';

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule
    ],
  declarations: [
    ControlsComponent,
    BasicControlButtonComponent,
    ExpandableControlButtonComponent
  ],
  exports: [
    ControlsComponent
  ]
})
export class ControlsModule {
}
