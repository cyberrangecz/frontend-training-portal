/**
 * Class representing sandbox pool
 */

export class SandboxPool {
  id: number;
  definitionId: number;
  lockId: number;
  usedSize: number;
  maxSize: number;
  usedAndMaxSize: string;

  isFull(): boolean {
    return this.usedSize === this.maxSize;
  }

  isLocked(): boolean {
    return this.lockId !== undefined && this.lockId !== null;
  }

  isEmpty(): boolean {
    return this.usedSize === 0;
  }

}
