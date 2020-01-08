import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {AbstractQuestion} from '../../../model/questions/abstract-question';

@Injectable()
/**
 * Mocks behavior of training run assessment level service connected to backend for designers preview purposes
 */
export class PreviewAssessmentLevelService {

  submit(trainingRunId: number, answers: AbstractQuestion[]): Observable<any> {
    return of(true);
  }
}
