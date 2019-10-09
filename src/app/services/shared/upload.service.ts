import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {fromEvent, Observable} from 'rxjs';
import {mergeMap} from 'rxjs/operators';
import {TrainingDefinitionDTO} from '../../model/DTOs/training-definition/training-definition-dto';

@Injectable()
/**
 * Service parsing file and uploading it to endpoint
 */
export class UploadService {

  constructor(private http: HttpClient) {
  }

  public uploadTrainingDefinition(url: string, file: File): Observable<TrainingDefinitionDTO> {
    const fileReader = new FileReader();
    const fileRead$ = fromEvent(fileReader, 'load')
      .pipe(mergeMap(e => {
        const jsonBody = JSON.parse(fileReader.result as string);
        return this.http.post<TrainingDefinitionDTO>(url, jsonBody);
      }));
    fileReader.readAsText(file);
    return fileRead$;
  }
}
