import { SentinelAuthConfig } from '@sentinel/auth';
import { SandboxAgendaConfig } from 'kypo-sandbox-agenda';
import { KypoSandboxConfig } from 'kypo-sandbox-api';
import { TrainingAgendaConfig } from 'kypo-training-agenda';
import { KypoTrainingApiConfig } from 'kypo-training-api';
import { UserAndGroupAgendaConfig } from 'kypo-user-and-group-agenda';
import { KypoUserAndGroupApiConfig } from 'kypo-user-and-group-api';
import { RoleMapping } from './role-mapping';
import { SentinelConfig } from '@sentinel/common';

export interface KypoConfig extends SentinelConfig {
  roleMapping: RoleMapping;
  trainingAgendaConfig: TrainingAgendaConfig;
  trainingApiConfig: KypoTrainingApiConfig;
  sandboxAgendaConfig: SandboxAgendaConfig;
  sandboxApiConfig: KypoSandboxConfig;
  userAndGroupAgendaConfig: UserAndGroupAgendaConfig;
  userAndGroupApiConfig: KypoUserAndGroupApiConfig;
  authConfig: SentinelAuthConfig;
}
