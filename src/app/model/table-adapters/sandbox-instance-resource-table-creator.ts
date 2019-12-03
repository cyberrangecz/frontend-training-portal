import {Column, Kypo2Table, Row} from 'kypo2-table';
import {SandboxInstanceResource} from '../sandbox/pool/sandbox-instance/sandbox-instance-resource/sandbox-instance-resource';

export class SandboxInstanceResourceTableCreator {
  static create(resources: SandboxInstanceResource[]): Kypo2Table<SandboxInstanceResource> {
    const rows = resources.map(resource =>  new Row(resource, []));
    return  new Kypo2Table<SandboxInstanceResource>(
      rows,
      [
        new Column('name', 'name', false),
        new Column('type', 'type', false),
        new Column('status', 'status', false)
      ]
    );
  }}
