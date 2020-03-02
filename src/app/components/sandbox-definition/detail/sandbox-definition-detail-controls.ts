import {ControlButton} from '../../../model/controls/control-button';

export class SandboxDefinitionDetailControls {
  static readonly CREATE_ACTION_ID = 'create';

  static create() {
    return [
      new ControlButton(
        this.CREATE_ACTION_ID,
        'Create',
        'primary',
      )
    ];
  }
}
