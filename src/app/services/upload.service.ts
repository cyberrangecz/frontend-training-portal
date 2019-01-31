import {Injectable} from "@angular/core";
import {fromEvent, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {TrainingDefinitionDTO} from '../model/DTOs/training-definition/trainingDefinitionDTO';
import {mergeMap} from 'rxjs/operators';

@Injectable()
export class UploadService {


  constructor(private http: HttpClient) {
  }

  public uploadTrainingDefinition(url: string, file: File): Observable<TrainingDefinitionDTO> {
    let fileReader = new FileReader();
    const fileRead$ = fromEvent(fileReader, 'load')
      .pipe(mergeMap(e => {
        const jsonBody = JSON.parse(fileReader.result as string);
        return this.http.post<TrainingDefinitionDTO>(url, jsonBody);
      }));
    fileReader.readAsText(file);
    return fileRead$;
  }
}
