import {DateTimeFormatPipe} from '../../../../pipes/date-time-format.pipe';

export abstract class PoolRequest {
  id: number;
  poolId: number;
  createdAtFormatted: string;
  private _createdAt: Date;

  set createdAt(value: Date) {
    this._createdAt = value;
    const dateTimeFormatter = new DateTimeFormatPipe('en-EN');
    this.createdAtFormatted = dateTimeFormatter.transform(value);
  }
}
