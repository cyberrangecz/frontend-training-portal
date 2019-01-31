import {Injectable} from "@angular/core";
import {fromEvent, Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TrainingDefinitionDTO} from '../model/DTOs/training-definition/trainingDefinitionDTO';
import {mergeMap} from 'rxjs/operators';
import {SandboxDefinitionCreateDTO} from "../model/DTOs/sandbox-definition/sandbox-definition-create-dto";

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

  public uploadSandboxDefinition(url: string, file: File): Observable<SandboxDefinitionCreateDTO> {
    let fileReader = new FileReader();
    const fileRead$ = fromEvent(fileReader, 'load')
      .pipe(mergeMap(e => {
        return this.http.post<SandboxDefinitionCreateDTO>(url,
          fileReader.result as string,
          { headers: this.createYamlContentHeader() });
      }));
    fileReader.readAsText(file);
    return fileRead$;
  }

  private createYamlContentHeader(): HttpHeaders {
    return new HttpHeaders().append('Content-Type', 'text/yaml' )
  }
}
