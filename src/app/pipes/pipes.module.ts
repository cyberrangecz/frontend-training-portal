import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {DateTimeFormatPipe} from './date-time-format.pipe';
import {ShortStringPipe} from './short-string.pipe';

/**
 * Contains all custom pipes
 */
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DateTimeFormatPipe,
    ShortStringPipe,
  ],
  exports: [
    DateTimeFormatPipe,
    ShortStringPipe,
  ]
})

export class PipesModule {
}
