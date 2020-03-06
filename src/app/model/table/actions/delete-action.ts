import {RowAction} from 'kypo2-table';
import {Observable} from 'rxjs';

export class DeleteAction extends RowAction {

  constructor(tooltip: string, disabled$: Observable<boolean>, result$: Observable<any>) {
    super('delete', 'Delete', 'delete', 'warn', tooltip, disabled$, result$);
  }
}
