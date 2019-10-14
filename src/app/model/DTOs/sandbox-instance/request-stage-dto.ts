export class RequestStageDTO {
  id: number;
  job_id: number;
  description: string;
  type: 'ANSIBLE_RUN' | 'OPENSTACK';
  state: 'IN_QUEUE' | 'RUNNING' | 'FINISHED' | 'FAILED';
  percent: number;
  output?: string;
}
