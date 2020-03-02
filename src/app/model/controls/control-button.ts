import {Observable, of} from 'rxjs';

export class ControlButton {
  id: string;
  label: string;
  matColor: 'primary' | 'warn' | 'accent';
  disabled$: Observable<boolean>;
  action$?: Observable<any>;

  constructor(id: string, label: string, matColor: 'primary' | 'warn' | 'accent', disabled$?: Observable<boolean>, action$?: Observable<any>) {
    this.id = id;
    this.label = label;
    this.matColor = matColor;
    this.disabled$ = disabled$ ? disabled$ : of(false);
    this.action$ = action$;
  }
}
