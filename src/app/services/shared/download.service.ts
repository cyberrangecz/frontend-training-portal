import {HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {saveAs} from 'file-saver';
@Injectable()
/**
 * General purpose service to downloads files
 */
export class DownloadService {

  /**
   * Downloads JSON file from Blob HttpResponse
   * @param response blob http response containing file data
   * @param filename file name of a downloaded file
   */
  downloadJSONFileFromBlobResponse(response: HttpResponse<Blob>, filename: string) {
    const blob = new Blob([response.body], { type: 'text/json' });
    saveAs(blob, filename);
  }
}
