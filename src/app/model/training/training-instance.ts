/**
 * Class representing training instance of a definition.
 */
export class TrainingInstance {

  id: number;
  trainingDefinitionId: number;
  startTime: Date;
  endTime: Date;
  title: string;
  poolSize: number;
  sandboxInstancesIds: number[];
  organizersIds: number[];
  keyword: string;


  constructor(trainingDefinitionId: number, startTime: Date, endTime: Date, poolSize: number, sandboxInstancesIds: number[], organizersIds: number[], keyword: string) {
    this.trainingDefinitionId = trainingDefinitionId;
    this.startTime = startTime;
    this.endTime = endTime;
    this.poolSize = poolSize;
    this.sandboxInstancesIds = sandboxInstancesIds;
    this.organizersIds = organizersIds;
    this.keyword = keyword;
  }
}
