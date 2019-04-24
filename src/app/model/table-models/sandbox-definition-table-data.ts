import {SandboxDefinition} from "../sandbox/sandbox-definition";
import {TrainingDefinition} from "../training/training-definition";
import {ITableDataModel} from "./itable-data-model";
import {AssociatedTrainingDefinition} from '../training/associated-training-definition';

export class SandboxDefinitionTableData implements ITableDataModel{
  sandbox: SandboxDefinition;
  associatedTrainingDefinitions: AssociatedTrainingDefinition[];
  canBeRemoved: boolean;
}
