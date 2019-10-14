import {RequestStageDTO} from './request-stage-dto';

export class PoolRequestDTO {
  id: number;
  type: 'CREATION' | 'CLEANUP';
  stages: RequestStageDTO[];
}
