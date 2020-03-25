export class RequestStageDTO {
  id: number;
  request: number;
  type: string;
  start: Date;
  end: Date;
  failed: boolean;
  error_message: string;
}
