import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {SandboxAllocationBarState} from "../../../model/enums/sandbox-allocation-bar-state.enum";

@Injectable()
export class SandboxAllocationBarService {

  private _isOpen: boolean = false;

  private _sandboxAllocationBarStateChangeSubject: Subject<SandboxAllocationBarState> = new Subject();
  sandboxAllocationBarStateChange: Observable<SandboxAllocationBarState> = this._sandboxAllocationBarStateChangeSubject.asObservable();


  isOpen() {
    return this._isOpen;
  };

  open() {
    this._sandboxAllocationBarStateChangeSubject.next(SandboxAllocationBarState.OPEN);
    this._isOpen = true;
  }
  close() {
    this._sandboxAllocationBarStateChangeSubject.next(SandboxAllocationBarState.CLOSED);
    this._isOpen = false;
  }
}
