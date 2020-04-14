import {TrainingAgendaConfig} from 'kypo-training-agenda';
import {KypoTrainingApiConfig} from 'kypo-training-api';
import {SandboxAgendaConfig} from 'kypo-sandbox-agenda';
import {KypoSandboxConfig} from 'kypo-sandbox-api';
import {UserAndGroupConfig} from 'kypo2-user-and-group-management';
import {Kypo2AuthConfig} from 'kypo2-auth';

export interface KypoConfig {
  trainingAgendaConfig: TrainingAgendaConfig;
  trainingApiConfig: KypoTrainingApiConfig;
  sandboxAgendaConfig: SandboxAgendaConfig;
  sandboxApiConfig: KypoSandboxConfig;
  userAndGroupConfig: UserAndGroupConfig,
  authConfig: Kypo2AuthConfig
}

export interface ExtendedWindow extends Window {
  kypoConfig: KypoConfig
}
