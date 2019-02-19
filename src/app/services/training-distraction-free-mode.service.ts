import {Injectable} from "@angular/core";
import {Subject} from "rxjs/internal/Subject";
import {Observable} from "rxjs/internal/Observable";

@Injectable()
/**
 * Service to hide toolbar and sidebar in certain parts of the webapp
 */
export class TrainingDistractionFreeModeService {

  private _distractionFreeMode: boolean = false;

  private _modeChangedSubject: Subject<boolean> = new Subject();
  modeChanged: Observable<boolean> = this._modeChangedSubject.asObservable();

  setDistractionFreeMode(value: boolean) {
    this._distractionFreeMode = value;
    this._modeChangedSubject.next(this._distractionFreeMode);
  }

  getDistractionFreeMode(): boolean {
    return this._distractionFreeMode;
  }

}
