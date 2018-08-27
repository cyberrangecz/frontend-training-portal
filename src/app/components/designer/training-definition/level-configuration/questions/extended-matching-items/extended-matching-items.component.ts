import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ExtendedMatchingItems} from "../../../../../../model/questions/extended-matching-items";

@Component({
  selector: 'extended-matching-items',
  templateUrl: './extended-matching-items.component.html',
  styleUrls: ['./extended-matching-items.component.css']
})
export class ExtendedMatchingItemsComponent implements OnInit, OnChanges {

  @Input('question') question: ExtendedMatchingItems;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('question' in changes) {
      this.resolveInitialValues();
    }
  }

  /**
   * Determines whether the user has saved all his work and can leave the component
   * @returns {boolean} true does not have any unsaved changes, false otherwise
   */
  canDeactivate(): boolean {
    return true;
  }

  saveChanges() {

  }

  private resolveInitialValues() {

  }
}
