import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class TrainingDefinitionLoaderService {

  constructor(private http: HttpClient) {
  }
}
