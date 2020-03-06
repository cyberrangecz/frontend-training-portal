import {RowAction} from 'kypo2-table';
import {Observable} from 'rxjs';

export class EditAction extends RowAction {
  constructor(tooltip: string, disabled$: Observable<boolean>, result$: Observable<any>) {
    super('edit', 'Edit', 'create', 'primary', tooltip, disabled$, result$);
  }
}
