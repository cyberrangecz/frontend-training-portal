import { SentinelAuthConfig } from '@sentinel/auth';
import { SandboxAgendaConfig } from '@crczp/sandbox-agenda';
import { SandboxConfig } from '@crczp/sandbox-api';
import { TrainingAgendaConfig } from '@crczp/training-agenda';
import { TrainingApiConfig } from '@crczp/training-api';
import { UserAndGroupAgendaConfig } from '@crczp/user-and-group-agenda';
import { UserAndGroupApiConfig } from '@crczp/user-and-group-api';
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
