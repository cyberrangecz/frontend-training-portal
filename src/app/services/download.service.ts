import {Injectable} from '@angular/core';
import {saveAs} from 'file-saver';
@Injectable()
export class DownloadService {

  downloadJSONFileFromJSONResponse(data: any, filename: string) {
    const blob = new Blob([JSON.stringify(data)], {type: 'text/json;' });
    saveAs(blob, filename);
  }

  downloadJSONFileFromBlobResponse(data: any, filename: string) {
    let blob = new Blob([data], { type: 'text/json' });
    saveAs(blob, filename);
  }
}
