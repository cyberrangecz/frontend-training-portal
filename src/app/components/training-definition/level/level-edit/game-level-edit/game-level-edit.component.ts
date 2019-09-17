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
import {GameLevel} from '../../../../../model/level/game-level';
import {BaseComponent} from '../../../../base.component';
import { GameLevelEditFormGroup } from './game-level-edit-form-group';
import {takeWhile} from 'rxjs/operators';
import {Hint} from '../../../../../model/level/hint';

@Component({
  selector: 'kypo2-game-level-edit',
  templateUrl: './game-level-edit.component.html',
  styleUrls: ['./game-level-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
/**
 * Component for editing new or existing game level
 */
export class GameLevelEditComponent extends BaseComponent implements OnInit, OnChanges {
  @Input() level: GameLevel;
  @Output() levelChange: EventEmitter<GameLevel> = new EventEmitter();
  gameLevelConfigFormGroup: GameLevelEditFormGroup;

  ngOnInit() {}

  get title() {
    return this.gameLevelConfigFormGroup.formGroup.get('title');
  }
  get content() {
    return this.gameLevelConfigFormGroup.formGroup.get('content');
  }
  get solution() {
    return this.gameLevelConfigFormGroup.formGroup.get('solution');
  }
  get maxScore() {
    return this.gameLevelConfigFormGroup.formGroup.get('maxScore');
  }
  get solutionPenalized() {
    return this.gameLevelConfigFormGroup.formGroup.get('solutionPenalized');
  }
  get incorrectFlagLimit() {
    return this.gameLevelConfigFormGroup.formGroup.get('incorrectFlagLimit');
  }
  get flag() {
    return this.gameLevelConfigFormGroup.formGroup.get('flag');
  }
  get estimatedDuration() {
    return this.gameLevelConfigFormGroup.formGroup.get('estimatedDuration');
  }
  get hints() {
    return this.gameLevelConfigFormGroup.formGroup.get('hints');
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('level' in changes) {
      this.gameLevelConfigFormGroup = new GameLevelEditFormGroup(this.level);
      this.gameLevelConfigFormGroup.formGroup.valueChanges
        .pipe(
          takeWhile(_ => this.isAlive)
        ).subscribe(_ => {
        this.gameLevelConfigFormGroup.setToLevel(this.level);
        this.levelChange.emit(this.level);
      });
    }
  }

  hintsChanged(hints: Hint[]) {
    this.level.hints = hints;
    this.gameLevelConfigFormGroup.setToLevel(this.level);
    this.levelChange.emit(this.level);
  }
}
