import {LevelEditService} from '../../../../../services/training-definition/edit/level-edit.service';
import {defer, NEVER, Observable, of} from 'rxjs';
import {ControlButton} from '../../../../../model/controls/control-button';
import {ExpandableControlButton} from '../../../../../model/controls/expandable-control-button';
import {ExpandedMenuControlButton} from '../../../../../model/controls/expanded-menu-control-button';
import {AbstractLevelTypeEnum} from '../../../../../model/enums/abstract-level-type.enum';

export class LevelOverviewControls {

  static readonly ADD_ACTION_ID = 'add';
  static readonly DELETE_ACTION_ID = 'delete';
  static readonly SAVE_ACTION_ID = 'save';
  static readonly ADD_GAME_LEVEL_ID = 'add_game_level';
  static readonly ADD_ASSESSMENT_LEVEL_ID = 'add_assessment_level';
  static readonly ADD_INFO_LEVEL_ID = 'add_info_level';

  static create(service: LevelEditService, saveDisabled$: Observable<boolean>, deleteDisabled$: Observable<boolean>): ControlButton[] {
    return [
      new ExpandableControlButton(
        this.ADD_ACTION_ID,
        'Add',
        'primary',
        of(false),
        of(NEVER),
        this.createAddExpandedMenuControlButtons(service)
      ),
      new ControlButton(
        this.DELETE_ACTION_ID,
        'Delete',
        'warn',
        deleteDisabled$,
        defer(() => service.deleteSelected()),
      ),
      new ControlButton(
        this.SAVE_ACTION_ID,
        'Save',
        'primary',
        saveDisabled$,
        defer(() => service.saveSelected())
      )
    ];
  }

  private static createAddExpandedMenuControlButtons(service: LevelEditService): ExpandedMenuControlButton[] {
    return [
      new ExpandedMenuControlButton(
        this.ADD_GAME_LEVEL_ID,
        'Game Level',
        'primary',
        of(false),
        defer(() => service.add(AbstractLevelTypeEnum.Game)),
        'videogame_asset'
      ),
      new ExpandedMenuControlButton(
        this.ADD_ASSESSMENT_LEVEL_ID,
        'Assessment Level',
        'primary',
        of(false),
        defer(() => service.add(AbstractLevelTypeEnum.Assessment)),
        'assignment'
      ),
      new ExpandedMenuControlButton(
        this.ADD_INFO_LEVEL_ID,
        'Info Level',
        'primary',
        of(false),
        defer(() => service.add(AbstractLevelTypeEnum.Info)),
        'info'
      ),
    ];
  }
}
