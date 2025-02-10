import { SentinelAuthConfig } from '@sentinel/auth';
import { SandboxAgendaConfig } from '@cyberrangecz-platform/sandbox-agenda';
import { SandboxConfig } from '@cyberrangecz-platform/sandbox-api';
import { TrainingAgendaConfig } from '@cyberrangecz-platform/training-agenda';
import { TrainingApiConfig } from '@cyberrangecz-platform/training-api';
import { UserAndGroupAgendaConfig } from '@cyberrangecz-platform/user-and-group-agenda';
import { UserAndGroupApiConfig } from '@cyberrangecz-platform/user-and-group-api';
import { RoleMapping } from './role-mapping';
import { SentinelConfig } from '@sentinel/common/dynamic-env';

export interface PortalConfig extends SentinelConfig {
  roleMapping: RoleMapping;
  trainingAgendaConfig: TrainingAgendaConfig;
  trainingApiConfig: TrainingApiConfig;
  sandboxAgendaConfig: SandboxAgendaConfig;
  sandboxApiConfig: SandboxConfig;
  userAndGroupAgendaConfig: UserAndGroupAgendaConfig;
  userAndGroupApiConfig: UserAndGroupApiConfig;
  authConfig: SentinelAuthConfig;
  version: string;
}
