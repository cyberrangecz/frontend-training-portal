import {OnDestroy} from '@angular/core';

/**
 * Base component to handle behaviour common for all components.
 * By extending this component you don't need to store subscriptions and unsubscribe in ngOnDestroy of each component
 * but simply pipe the observable with takeWhile(() => this.isAlive)
 */
export class BaseComponent implements OnDestroy {
  protected isAlive = true;

  ngOnDestroy(): void {
    this.isAlive = false;
  }
}
