import {NgModule} from '@angular/core';
import {ThrottleClickDirective} from './throttle-click.directive';

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
