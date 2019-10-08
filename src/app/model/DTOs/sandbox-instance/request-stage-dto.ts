export class RequestStageDTO {
  id: number;
  job_id: number;
  description: string;
  type: 'ANSIBLE_RUN' | 'OPENSTACK';
}
