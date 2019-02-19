import {Injectable} from '@angular/core';
import {saveAs} from 'file-saver';
@Injectable()
export class DownloadService {

  downloadFileFromJSON(data: any, filename: string) {
    const blob = new Blob([JSON.stringify(data)], {type: 'text/json;' });
    saveAs(blob, filename);
  }
}
