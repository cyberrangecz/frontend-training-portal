import {Pool} from 'kypo-sandbox-model';

export class SandboxPoolListAdapter {

  id: number;
  title: string;
  pool: Pool;

  constructor(pool: Pool) {
    this.id = pool.id;
    this.title = !pool.isLocked() ? pool.id .toString(): `${pool.id} (locked)`;
    this.pool = pool;
  }
}
