import {Pool} from '../sandbox/pool/pool';

export class SandboxPoolListAdapter {

  id: number;
  title: string;
  pool: Pool;

  constructor(pool: Pool) {
    console.log(pool);
    this.id = pool.id;
    this.title = !pool.isLocked() ? pool.id .toString(): `${pool.id} (locked)`;
    this.pool = pool;
  }
}
