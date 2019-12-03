export class RequestStageDTO {
  id: number;
  request: number;
  start: Date;
  end: Date;
  failed: boolean;
  error_message: string;
  type?: 'ANSIBLE' | 'OPENSTACK';
}
