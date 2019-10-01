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
import {InfoLevel} from '../../../../../../model/level/info-level';
import {BaseComponent} from '../../../../../base.component';
import { InfoLevelConfigFormGroup } from './info-level-edit-form-group';
import {takeWhile} from 'rxjs/operators';

@Component({
  selector: 'kypo2-info-level-configuration',
  templateUrl: './info-level-edit.component.html',
  styleUrls: ['./info-level-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
/**
 * Component for editing of new or existing info level
 */
export class InfoLevelEditComponent extends BaseComponent implements OnInit, OnChanges {

  @Input() level: InfoLevel;
  @Output() levelChange: EventEmitter<InfoLevel> = new EventEmitter();

  infoLevelConfigFormGroup: InfoLevelConfigFormGroup;

  ngOnInit() {
  }

  get title() {return this.infoLevelConfigFormGroup.formGroup.get('title'); }
  get content() {return this.infoLevelConfigFormGroup.formGroup.get('content'); }


  ngOnChanges(changes: SimpleChanges) {
    if ('level' in changes) {
      this.infoLevelConfigFormGroup = new InfoLevelConfigFormGroup(this.level);
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
