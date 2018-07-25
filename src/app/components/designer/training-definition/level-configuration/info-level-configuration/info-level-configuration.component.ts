import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {InfoLevel} from "../../../../../model/level/info-level";
import {AlertTypeEnum} from "../../../../../enums/alert-type.enum";
import {AlertService} from "../../../../../services/event-services/alert.service";

@Component({
  selector: 'info-level-configuration',
  templateUrl: './info-level-configuration.component.html',
  styleUrls: ['./info-level-configuration.component.css']
})
export class InfoLevelConfigurationComponent implements OnInit, OnChanges {

  @Input('level') level: InfoLevel;

  title: string;
  content: string; // MARKDOWN

  constructor(private alertService: AlertService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('level' in changes) {
      this.setInitialValues();
    }
  }

  saveChanges() {
    if (this.validateChanges()) {
      this.setInputValuesToLevel();
      // TODO: call service and save level through rest
    }
  }

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

  private setInputValuesToLevel() {
    this.level.title = this.title;
    this.level.content = this.content;
  }

  private setInitialValues() {
    this.title = this.level.title;
    this.content = this.level.content;
  }
}
