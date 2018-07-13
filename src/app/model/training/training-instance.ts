import {TrainingDefinition} from "./training-definition";
import {User} from "../user/user";
import {SandboxInstance} from "../sandbox/sandbox-instance";

export class TrainingInstance {

  id: number;
  trainingDefinition: TrainingDefinition;
  startTime: Date;
  endTime: Date;
  title: string;
  poolSize: number;
  sandboxInstances: SandboxInstance[];
  organizers: User[];
  keyword: string;


  constructor(id: number, trainingDefinition: TrainingDefinition, startTime: Date, endTime: Date, poolSize: number, sandboxInstances: SandboxInstance[], organizers: User[], keyword: string) {
    this.id = id;
    this.trainingDefinition = trainingDefinition;
    this.startTime = startTime;
    this.endTime = endTime;
    this.poolSize = poolSize;
    this.sandboxInstances = sandboxInstances;
    this.organizers = organizers;
    this.keyword = keyword;
  }
}
