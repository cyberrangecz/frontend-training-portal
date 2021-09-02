import { SentinelAuthConfig } from '@sentinel/auth';
import { SandboxAgendaConfig } from '@muni-kypo-crp/sandbox-agenda';
import { KypoSandboxConfig } from '@muni-kypo-crp/sandbox-api';
import { TrainingAgendaConfig } from '@muni-kypo-crp/training-agenda';
import { KypoTrainingApiConfig } from '@muni-kypo-crp/training-api';
import { UserAndGroupAgendaConfig } from '@muni-kypo-crp/user-and-group-agenda';
import { KypoUserAndGroupApiConfig } from '@muni-kypo-crp/user-and-group-api';
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
  version: string;
}
