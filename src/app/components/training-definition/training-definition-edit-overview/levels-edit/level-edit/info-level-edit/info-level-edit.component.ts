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
import {takeWhile} from 'rxjs/operators';
import {InfoLevel} from '../../../../../../model/level/info-level';
import {KypoBaseComponent} from 'kypo-common';
import {InfoLevelEditFormGroup} from './info-level-edit-form-group';

/**
 * Component for editing of new or existing info level
 */
@Component({
  selector: 'kypo2-info-level-configuration',
  templateUrl: './info-level-edit.component.html',
  styleUrls: ['./info-level-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoLevelEditComponent extends KypoBaseComponent implements OnInit, OnChanges {

  @Input() level: InfoLevel;
  @Output() levelChange: EventEmitter<InfoLevel> = new EventEmitter();

  infoLevelConfigFormGroup: InfoLevelEditFormGroup;

  ngOnInit() {
  }

  get title() {return this.infoLevelConfigFormGroup.formGroup.get('title'); }
  get content() {return this.infoLevelConfigFormGroup.formGroup.get('content'); }


  ngOnChanges(changes: SimpleChanges) {
    if ('level' in changes) {
      this.infoLevelConfigFormGroup = new InfoLevelEditFormGroup(this.level);
      this.infoLevelConfigFormGroup.formGroup.valueChanges
        .pipe(
          takeWhile(_ => this.isAlive)
        ).subscribe(_ => {
          this.infoLevelConfigFormGroup.setToLevel(this.level);
          this.levelChange.emit(this.level);
      });
    }
  }
}
