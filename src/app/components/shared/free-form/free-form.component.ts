import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {FormArray, FormControl, Validators} from '@angular/forms';
import {BaseComponent} from '../../base.component';
import {FreeFormItemFormGroup} from '../../../model/utils/free-form-item-form-group';
import {FreeFormItemsChangeEvent} from '../../../model/utils/free-form-items-change-event';

/**
 * Component coupling multiple form inputs with possibility to add more inputs and remove already existing.
 * Suitable for forms where user should input multiple values under some group/topic
 */
@Component({
  selector: 'kypo2-free-form',
  templateUrl: './free-form.component.html',
  styleUrls: ['./free-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FreeFormComponent extends BaseComponent implements OnInit, OnChanges {

  @Input() formName: string;
  @Input() formPlaceholder: string;
  @Input() formData: string[];
  @Input() hasHeader: boolean;
  @Input() required: boolean;

  /**
   * Emits current state of items on each change of input
   */
  @Output() itemsChange: EventEmitter<FreeFormItemsChangeEvent> = new EventEmitter();

  freeFormItemFormGroup: FreeFormItemFormGroup;

  get items() {
    return <FormArray>this.freeFormItemFormGroup.formGroup.get('items');
  }

  constructor() { super(); }

  ngOnInit() {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('formData' in changes) {
      if (this.freeFormItemFormGroup) {
        this.freeFormItemFormGroup.formGroup.patchValue({items: this.formData});
      } else {
        this.freeFormItemFormGroup = new FreeFormItemFormGroup(this.formData, this.required);
      }
      this.freeFormItemFormGroup.formGroup.updateValueAndValidity();
    }
    if ('required' in changes) {
      this.freeFormItemFormGroup.formGroup.updateValueAndValidity();
    }
  }

  /**
   * Initializes form with default values and placeholders
   */
  initForm() {
    if (!this.formName || this.formName === '') {
      this.formName = 'Items';
    }
    if (!this.formPlaceholder || this.formPlaceholder === '') {
      this.formPlaceholder = 'Item';
    }
  }

  /**
   * Adds new input to the form
   */
  addItem() {
    (this.items as FormArray).push(new FormControl('', this.required ? Validators.required : undefined));
    this.freeFormItemFormGroup.formGroup.markAsDirty();
    this.freeFormItemFormGroup.formGroup.updateValueAndValidity();
    this.itemsChange.emit({
      items: this.items.value,
      index: this.items.length,
      isAdded: true,
      validity: this.freeFormItemFormGroup.formGroup.valid
    });
  }

  /**
   * Removes input
   * @param index index of input in form
   */
  removeItem(index: number) {
    this.items.removeAt(index);
    this.itemsChange.emit({items: this.items.value, index: index, isDeleted: true, validity: this.freeFormItemFormGroup.formGroup.valid});
  }

  /**
   * Removes all inputs
   */
  clear() {
    this.items.clear();
    this.freeFormItemFormGroup.formGroup.updateValueAndValidity();
    this.itemsChange.emit({cleared: true, validity: this.freeFormItemFormGroup.formGroup.valid});
  }

  private onChanged(index: number) {
    this.freeFormItemFormGroup.formGroup.updateValueAndValidity();
    this.freeFormItemFormGroup.formGroup.markAsDirty();
    this.itemsChange.emit({items: this.items.value, index: index, validity: this.freeFormItemFormGroup.formGroup.valid});
  }
}
