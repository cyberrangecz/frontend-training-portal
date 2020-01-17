import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Question} from '../../../model/questions/question';

@Injectable()
/**
 * Mocks behavior of training run assessment level service connected to backend for designers preview purposes
 */
export class PreviewAssessmentLevelService {

  submit(trainingRunId: number, answers: Question[]): Observable<any> {
    return of(true);
  }
}
