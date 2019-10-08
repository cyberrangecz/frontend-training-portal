import {RequestStageDTO} from './request-stage-dto';

export class PoolRequestDTO {
  id: number;
  type: 'CREATION' | 'DELETION';
  stages: RequestStageDTO[];
}
