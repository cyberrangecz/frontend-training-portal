import {SandboxDefinition} from "../sandbox/sandbox-definition";
import {TrainingDefinition} from "../training/training-definition";
import {ITableDataModel} from "./itable-data-model";

export class SandboxDefinitionTableDataModel implements ITableDataModel{
  sandbox: SandboxDefinition;
  associatedTrainingDefinitions: TrainingDefinition[];
  canBeRemoved: boolean;
}
