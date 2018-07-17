import {User} from "../user/user";
import {SandboxInstance} from "../sandbox/sandbox-instance";

export class TrainingInstance {

  id: number;
  trainingDefinitionId: number;
  startTime: Date;
  endTime: Date;
  title: string;
  poolSize: number;
  sandboxInstancesIds: number[];
  organizers: User[];
  keyword: string;


  constructor(id: number, trainingDefinitionId: number, startTime: Date, endTime: Date, poolSize: number, sandboxInstancesIds: number[], organizers: User[], keyword: string) {
    this.id = id;
    this.trainingDefinitionId = trainingDefinitionId;
    this.startTime = startTime;
    this.endTime = endTime;
    this.poolSize = poolSize;
    this.sandboxInstancesIds = sandboxInstancesIds;
    this.organizers = organizers;
    this.keyword = keyword;
  }
}
