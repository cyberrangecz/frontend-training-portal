import {SandboxDefinition} from "../sandbox/sandbox-definition";
import {TableRowAdapter} from "./table-row-adapter";
import {TrainingDefinitionInfo} from '../training/training-definition-info';
import {StringNormalizer} from "../utils/ignore-diacritics-filter";

export class SandboxDefinitionTableRow implements TableRowAdapter {
  sandbox: SandboxDefinition;
  associatedTrainingDefinitions: TrainingDefinitionInfo[];
  canBeRemoved: boolean;
  urlShortened = true;
  normalizedTitle: string;


  constructor(sandbox: SandboxDefinition) {
    this.sandbox = sandbox;
    this.normalizedTitle = StringNormalizer.normalizeDiacritics(sandbox.title).toLowerCase();
  }
}

