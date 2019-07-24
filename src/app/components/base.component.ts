import {OnDestroy} from "@angular/core";

/**
 * Base component to handle behaviour common for all components. You can handle unsubscribing from observables simply be pipe with takeWhile(() => this.isAlive)
 */
export class BaseComponent implements OnDestroy {
  protected isAlive = true;

  ngOnDestroy(): void {
    this.isAlive = false;
  }
}
