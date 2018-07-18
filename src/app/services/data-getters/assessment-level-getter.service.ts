import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class AssessmentLevelGetterService {

  constructor(private http: HttpClient) {
  }
}
