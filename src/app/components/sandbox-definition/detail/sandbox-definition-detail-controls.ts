import {KypoControlItem} from 'kypo-controls';

export class SandboxDefinitionDetailControls {
  static readonly CREATE_ACTION_ID = 'create';

  static create() {
    return [
      new KypoControlItem(
        this.CREATE_ACTION_ID,
        'Create',
        'primary',
      )
    ];
  }
}
