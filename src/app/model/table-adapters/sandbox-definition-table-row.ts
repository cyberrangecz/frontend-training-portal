import {SandboxDefinition} from "../sandbox/sandbox-definition";
import {TableRowAdapter} from "./table-row-adapter";
import {TrainingDefinitionInfo} from '../training/training-definition-info';

export class SandboxDefinitionTableRow implements TableRowAdapter {
  sandbox: SandboxDefinition;
  associatedTrainingDefinitions: TrainingDefinitionInfo[];
  canBeRemoved: boolean;
  urlShortened = true;
}
