import {Injectable} from '@angular/core';
import {AbstractQuestion} from '../../model/questions/abstract-question';
import {Observable, of} from 'rxjs';

@Injectable()
/**
 * Mocks behavior of training run assessment level service connected to backend for preview/testing purposes
 */
export class PreviewAssessmentLevelService {

  submit(trainingRunId: number, answers: AbstractQuestion[]): Observable<any> {
    return of(true);
  }
}
