import {SandboxDefinition} from '../sandbox/definition/sandbox-definition';
import {TableRowAdapter} from './table-row-adapter';

export class SandboxDefinitionTableRow implements TableRowAdapter {
  id: number;
  sandbox: SandboxDefinition;
  title: string;

  constructor(sandbox: SandboxDefinition) {
    this.sandbox = sandbox;
    this.title = sandbox.title;
    this.id = sandbox.id;
  }
}

