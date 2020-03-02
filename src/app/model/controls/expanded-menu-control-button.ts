import {ControlButton} from './control-button';
import {Observable} from 'rxjs';

export class ExpandedMenuControlButton extends ControlButton {
  matIcon: string;

  constructor(id: string, label: string, matColor: 'primary' | 'warn' | 'accent', disabled$: Observable<boolean>, action$: Observable<any>, matIcon: string) {
    super(id, label, matColor, disabled$, action$);
    this.matIcon = matIcon;
  }
}
