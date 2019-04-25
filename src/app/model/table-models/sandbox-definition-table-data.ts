import {SandboxDefinition} from "../sandbox/sandbox-definition";
import {TrainingDefinition} from "../training/training-definition";
import {ITableDataModel} from "./itable-data-model";
import {TrainingDefinitionInfo} from '../training/training-definition-info';

export class SandboxDefinitionTableData implements ITableDataModel{
  sandbox: SandboxDefinition;
  associatedTrainingDefinitions: TrainingDefinitionInfo[];
  canBeRemoved: boolean;
}
