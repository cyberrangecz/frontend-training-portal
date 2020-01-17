/**
 * Class representing sandbox definition in a system
 */

export class SandboxDefinition {
  id: number;
  title: string;
  url: string;
  rev: string;

  toString() {
    return this.title;
  }
}
