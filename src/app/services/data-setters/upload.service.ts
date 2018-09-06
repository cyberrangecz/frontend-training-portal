import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class UploadService {


  constructor(private http: HttpClient) {
  }

  public upload(file: File): Observable<any> {
    const url = '';
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post(url, {formData});
  }
}
