import {BehaviorSubject, Observable} from 'rxjs';

export abstract class PaginatedResourceService {
  protected totalLengthSubject: BehaviorSubject<number> = new BehaviorSubject(0);
  totalLength$: Observable<number> = this.totalLengthSubject.asObservable();

  protected hasErrorSubject$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  hasError$: Observable<boolean> = this.hasErrorSubject$.asObservable();

  protected isLoadingSubject$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  isLoading$: Observable<boolean> = this.isLoadingSubject$.asObservable();
}
