import {Column, Kypo2Table, Row} from 'kypo2-table';
import {SandboxInstanceResource} from '../../sandbox/pool/sandbox-instance/sandbox-instance-resource/sandbox-instance-resource';

/**
 * Helper class transforming paginated resource to class for common table component
 */
export class SandboxInstanceResourceTable extends Kypo2Table<SandboxInstanceResource> {

  constructor(resource: SandboxInstanceResource[]) {
    const columns = [
      new Column('name', 'name', false),
      new Column('type', 'type', false),
      new Column('status', 'status', false)
    ];
    const rows = resource.map(element => new Row(element, []));
    super(rows, columns);
  }
}
