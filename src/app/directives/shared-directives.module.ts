import {NgModule} from '@angular/core';
import {ThrottleClickDirective} from './throttle-click.directive';

/**
 * Module of all directives
 */
@NgModule({
  declarations: [
    ThrottleClickDirective
  ],
  exports: [
    ThrottleClickDirective
  ]
})
export class SharedDirectivesModule {

}
