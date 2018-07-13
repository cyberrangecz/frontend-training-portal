import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class TrainingInstanceLoaderService {

  constructor(private http: HttpClient) {
  }
}
