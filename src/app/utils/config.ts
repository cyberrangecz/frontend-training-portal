import { SentinelAuthConfig } from '@sentinel/auth';
import { SandboxAgendaConfig } from 'kypo-sandbox-agenda';
import { KypoSandboxConfig } from 'kypo-sandbox-api';
import { TrainingAgendaConfig } from 'kypo-training-agenda';
import { KypoTrainingApiConfig } from 'kypo-training-api';
import { UserAndGroupAgendaConfig } from 'kypo-user-and-group-agenda';
import { KypoUserAndGroupApiConfig } from 'kypo-user-and-group-api';
import { RoleMapping } from './role-mapping';

export interface KypoConfig {
  roleMapping: RoleMapping;
  trainingAgendaConfig: TrainingAgendaConfig;
  trainingApiConfig: KypoTrainingApiConfig;
  sandboxAgendaConfig: SandboxAgendaConfig;
  sandboxApiConfig: KypoSandboxConfig;
  userAndGroupAgendaConfig: UserAndGroupAgendaConfig;
  userAndGroupApiConfig: KypoUserAndGroupApiConfig;
  authConfig: SentinelAuthConfig;
}

export interface ExtendedWindow extends Window {
  kypoConfig: KypoConfig;
}
