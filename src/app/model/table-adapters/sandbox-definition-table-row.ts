import {SandboxDefinition} from '../sandbox/definition/sandbox-definition';
import {TrainingDefinitionInfo} from '../training/training-definition-info';
import {StringNormalizer} from '../utils/ignore-diacritics-filter';
import {TableRowAdapter} from './table-row-adapter';

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

