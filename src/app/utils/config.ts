import { SandboxAgendaConfig } from 'kypo-sandbox-agenda';
import { KypoSandboxConfig } from 'kypo-sandbox-api';
import { TrainingAgendaConfig } from 'kypo-training-agenda';
import { KypoTrainingApiConfig } from 'kypo-training-api';
import { Kypo2AuthConfig } from 'kypo2-auth';
import { UserAndGroupConfig } from 'kypo2-user-and-group-management';

export interface KypoConfig {
  trainingAgendaConfig: TrainingAgendaConfig;
  trainingApiConfig: KypoTrainingApiConfig;
  sandboxAgendaConfig: SandboxAgendaConfig;
  sandboxApiConfig: KypoSandboxConfig;
  userAndGroupConfig: UserAndGroupConfig;
  authConfig: Kypo2AuthConfig;
}

export interface ExtendedWindow extends Window {
  kypoConfig: KypoConfig;
}
