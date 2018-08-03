import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {InfoLevel} from "../../../../../model/level/info-level";
import {AlertTypeEnum} from "../../../../../enums/alert-type.enum";
import {AlertService} from "../../../../../services/event-services/alert.service";

@Component({
  selector: 'info-level-configuration',
  templateUrl: './info-level-configuration.component.html',
  styleUrls: ['./info-level-configuration.component.css']
})
/**
 * Component for configuration of new or existing info level
 */
export class InfoLevelConfigurationComponent implements OnInit, OnChanges {

  @Input('level') level: InfoLevel;

  title: string;
  content: string;

  dirty = false;

  constructor(private alertService: AlertService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('level' in changes) {
      this.setInitialValues();
    }
  }

  /**
   * Determines whether the user has saved all his work and can leave the component
   * @returns {boolean} true does not have any unsaved changes, false otherwise
   */
  canDeactivate(): boolean {
    return !this.dirty;
  }

  /**
   * Validates and saves input values to the level object and calls REST API of server to save changes
   */
  saveChanges() {
    if (this.validateChanges()) {
      this.setInputValuesToLevel();
      this.dirty = false;
      // TODO: call service and save level through rest
      this.level.id = -999 // change to id retrieved from rest later
    }
  }

  /**
   * Reacts on change in inputs. Sets dirty to true
   */
  contentChanged() {
    this.dirty = true;
  }

  /**
   * Validates user input and displays error messages if errors are found
   * @returns {boolean} true if input passes the validation, false otherwise
   */
  private validateChanges(): boolean {
    let errorMessage: string = '';

    if (!this.title || this.title.replace(/\s/g, '') === '') {
      errorMessage += 'Title cannot be empty\n'
    }

    if (!this.content) {
      errorMessage += 'Content cannot be empty\n'
    }

    if (errorMessage !== '') {
      this.alertService.emitAlert(AlertTypeEnum.Error, errorMessage);
      return false;
    }
    return true;
  }

  /**
   * Sets input values to the info level object
   */
  private setInputValuesToLevel() {
    this.level.title = this.title;
    this.level.content = this.content;
  }

  /**
   * Sets initial values to inputs from info level object (edit mode)
   */
  private setInitialValues() {
    this.title = this.level.title;
    this.content = this.level.content;
  }
}
