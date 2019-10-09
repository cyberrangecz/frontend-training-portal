import {Column, Kypo2Table, Row} from 'kypo2-table';
import {RouteFactory} from '../routes/route-factory';
import {SandboxInstanceResource} from '../sandbox/pool/sandbox-instance/sandbox-instance-resource/sandbox-instance-resource';

export class SandboxInstanceResourceTableCreator {
  static create(resources: SandboxInstanceResource[], poolId: number, sandboxId: number): Kypo2Table<SandboxInstanceResource> {
    const rows = resources.map(resource => {
      const row = new Row(resource, []);
      row.addLink('name', RouteFactory.toSandboxInstanceResource(poolId, sandboxId, resource.name));
      return row;
    });
    return  new Kypo2Table<SandboxInstanceResource>(
      rows,
      [
        new Column('name', 'name', false),
        new Column('type', 'type', false),
        new Column('status', 'status', false)
      ]
    );
  }}
