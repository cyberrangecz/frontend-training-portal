import {Injectable} from '@angular/core';
import {saveAs} from 'file-saver';
import {HttpResponse} from '@angular/common/http';
@Injectable()
export class DownloadService {

  downloadJSONFileFromJSONResponse(data: any, filename: string) {
    const blob = new Blob([JSON.stringify(data)], {type: 'text/json;' });
    saveAs(blob, filename);
  }

  downloadJSONFileFromBlobResponse(response: HttpResponse<Blob>, filename: string) {
    let blob = new Blob([response.body], { type: 'text/json' });
    saveAs(blob, filename);
  }
}
