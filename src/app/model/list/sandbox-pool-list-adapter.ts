import {SandboxPool} from '../sandbox/pool/sandbox-pool';

export class SandboxPoolListAdapter {

  id: number;
  title: string;
  pool: SandboxPool;

  constructor(pool: SandboxPool) {
    console.log(pool);
    this.id = pool.id;
    this.title = !pool.isLocked() ? pool.id .toString(): `${pool.id} (locked)`;
    this.pool = pool;
  }
}
