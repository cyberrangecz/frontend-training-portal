import {KypoDateTimeFormatPipe} from 'kypo-common';

/**
 * Class representing pool request
 */
export abstract class Request {
  id: number;
  allocationUnitId: number;
  createdAtFormatted: string;
  readonly type: string;
  private _createdAt: Date;

  protected constructor(type: string) {
    this.type = type;
  }

  set createdAt(value: Date) {
    this._createdAt = value;
    const dateTimeFormatter = new KypoDateTimeFormatPipe('en-EN');
    this.createdAtFormatted = dateTimeFormatter.transform(value);
  }
}
