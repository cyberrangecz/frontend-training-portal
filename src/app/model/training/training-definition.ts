import {TrainingDefinitionStateEnum} from "../../enums/training-definition-state-enum";
import {AbstractLevel} from "../level/abstract-level";
import {User} from "../user/user";
import {SandboxDefinition} from "../sandbox/sandbox-definition";

export class TrainingDefinition {

  id: number;
  sandboxDefinition: SandboxDefinition;
  title: string;
  description: string;
  authors: User[];
  prerequisites: string;
  outcomes: string;
  state: TrainingDefinitionStateEnum;
  levels: AbstractLevel[];


  constructor(id: number, sandboxDefinition: SandboxDefinition, authors: User[], state: TrainingDefinitionStateEnum, levels: AbstractLevel[]) {
    this.id = id;
    this.sandboxDefinition = sandboxDefinition;
    this.authors = authors;
    this.state = state;
    this.levels = levels;
  }
}
