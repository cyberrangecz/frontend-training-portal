import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class TrainingRunLoaderService {

  constructor(private http: HttpClient) {
  }
}
