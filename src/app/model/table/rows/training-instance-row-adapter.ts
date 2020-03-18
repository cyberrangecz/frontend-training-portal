import {TrainingInstance} from '../../training/training-instance';
import {KypoDateTimeFormatPipe} from 'kypo-common';
import {Observable} from 'rxjs';

export class TrainingInstanceRowAdapter {

  trainingInstance: TrainingInstance;
  id: number;
  title: string;
  date: string;
  accessToken: string;
  tdTitle: string;
  poolId: string;
  poolSize: Observable<string>;

  constructor(trainingInstance: TrainingInstance) {
    const datePipe = new KypoDateTimeFormatPipe('en-EN');
    this.trainingInstance = trainingInstance;
    this.tdTitle = this.trainingInstance.trainingDefinition.title;
    this.title = trainingInstance.title;
    this.id = trainingInstance.id;
    this.accessToken = trainingInstance.accessToken;
    this.date = `${datePipe.transform(this.trainingInstance.startTime)} - ${datePipe.transform(this.trainingInstance.endTime)}`;
    if (trainingInstance.hasPool()) {
      this.poolId = trainingInstance.poolId.toString();
    } else {
      this.poolId = '-'
    }
  }
}
