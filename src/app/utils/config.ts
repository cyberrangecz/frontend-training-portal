import { SentinelAuthConfig } from '@sentinel/auth';
import { SandboxAgendaConfig } from '@cyberrangecz-platform/sandbox-agenda';
import { KypoSandboxConfig } from '@cyberrangecz-platform/sandbox-api';
import { TrainingAgendaConfig } from '@cyberrangecz-platform/training-agenda';
import { KypoTrainingApiConfig } from '@cyberrangecz-platform/training-api';
import { UserAndGroupAgendaConfig } from '@cyberrangecz-platform/user-and-group-agenda';
import { KypoUserAndGroupApiConfig } from '@cyberrangecz-platform/user-and-group-api';
import { RoleMapping } from './role-mapping';
import { SentinelConfig } from '@sentinel/common/dynamic-env';

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
