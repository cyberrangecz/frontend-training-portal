import {HttpResponse} from '@angular/common/http';
import {saveAs} from 'file-saver';

export class JsonFromBlobConverter {

  static convert(response: HttpResponse<Blob>, filename: string) {
    const blob = new Blob([response.body], { type: 'text/json' });
    saveAs(blob, filename);
  }
}
