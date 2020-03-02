import {ControlButton} from './control-button';
import {ExpandedMenuControlButton} from './expanded-menu-control-button';
import {Observable} from 'rxjs';

export class ExpandableControlButton extends ControlButton {
  children: ExpandedMenuControlButton[];

  constructor(id: string, label: string, matColor: 'primary' | 'warn' | 'accent', disabled$: Observable<boolean>, action$: Observable<any>, children: ExpandedMenuControlButton[]) {
    super(id, label, matColor, disabled$, action$);
    this.children = children;
  }
}
