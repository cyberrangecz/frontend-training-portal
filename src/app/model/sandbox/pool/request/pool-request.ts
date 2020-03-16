import {KypoDateTimeFormatPipe} from 'kypo-common';

/**
 * Class representing pool request
 */
export abstract class PoolRequest {
  id: number;
  poolId: number;
  createdAtFormatted: string;
  private _createdAt: Date;

  set createdAt(value: Date) {
    this._createdAt = value;
    const dateTimeFormatter = new KypoDateTimeFormatPipe('en-EN');
    this.createdAtFormatted = dateTimeFormatter.transform(value);
  }
}
