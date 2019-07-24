import {SandboxDefinition} from "../sandbox/sandbox-definition";
import {TableAdapter} from "./table-adapter";
import {TrainingDefinitionInfo} from '../training/training-definition-info';

export class SandboxDefinitionTableAdapter implements TableAdapter {
  sandbox: SandboxDefinition;
  associatedTrainingDefinitions: TrainingDefinitionInfo[];
  canBeRemoved: boolean;
  urlShortened = true;
}
