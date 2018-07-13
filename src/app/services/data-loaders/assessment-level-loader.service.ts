import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class AssessmentLevelLoaderService {

  constructor(private http: HttpClient) {
  }
}
