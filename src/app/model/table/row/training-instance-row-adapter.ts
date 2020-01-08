import {TrainingInstance} from '../../training/training-instance';
import {DateTimeFormatPipe} from '../../../pipes/date-time-format.pipe';
import {Observable} from 'rxjs';

export class TrainingInstanceRowAdapter {

  trainingInstance: TrainingInstance;
  id: number;
  title: string;
  date: string;
  accessToken: string;
  tdTitle: string;
  poolId: number;
  poolSize: Observable<string>;

  constructor(trainingInstance: TrainingInstance) {
    const datePipe = new DateTimeFormatPipe('en-EN');
    this.trainingInstance = trainingInstance;
    this.tdTitle = this.trainingInstance.trainingDefinition.title;
    this.title = trainingInstance.title;
    this.id = trainingInstance.id;
    this.accessToken = trainingInstance.accessToken;
    this.poolId = trainingInstance.poolId;
    this.date = `${datePipe.transform(this.trainingInstance.startTime)} - ${datePipe.transform(this.trainingInstance.endTime)}`;
  }
}
