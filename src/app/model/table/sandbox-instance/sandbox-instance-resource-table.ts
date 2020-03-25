import {Column, Kypo2Table, Row} from 'kypo2-table';
import {SandboxResource} from '../../sandbox/pool/sandbox-instance/sandbox-instance-resource/sandbox-resource';

/**
 * Helper class transforming paginated resource to class for common table component
 */
export class SandboxInstanceResourceTable extends Kypo2Table<SandboxResource> {

  constructor(resource: SandboxResource[]) {
    const columns = [
      new Column('name', 'name', false),
      new Column('type', 'type', false),
      new Column('status', 'status', false)
    ];
    const rows = resource.map(element => new Row(element, []));
    super(rows, columns);
  }
}
