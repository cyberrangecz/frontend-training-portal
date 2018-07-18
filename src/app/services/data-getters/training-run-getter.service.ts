import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class TrainingRunGetterService {

  constructor(private http: HttpClient) {
  }
}
