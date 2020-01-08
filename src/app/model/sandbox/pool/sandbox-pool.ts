/**
 * Class representing sandbox pool
 */
export class SandboxPool {
  id: number;
  definitionId: number;
  usedSize: number;
  maxSize: number;
  usedAndMaxSize: string;

  isFull(): boolean {
    return this.usedSize === this.maxSize;
  }

  isEmpty(): boolean {
    return this.usedSize === 0;
  }

}
