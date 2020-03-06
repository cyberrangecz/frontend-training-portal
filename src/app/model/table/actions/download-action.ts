import {RowAction} from 'kypo2-table';
import {Observable} from 'rxjs';

export class DownloadAction extends RowAction {

  constructor(tooltip: string, disabled$: Observable<boolean>, result$: Observable<any>) {
    super('download', 'Download', 'cloud_download', 'primary', tooltip, disabled$, result$);
  }
}
