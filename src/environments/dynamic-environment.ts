import { ExtendedWindow, KypoConfig } from '../app/utils/config';

export class DynamicEnvironment {
  public static getConfig(): KypoConfig {
    return ((window as unknown) as ExtendedWindow).kypoConfig;
  }

  static setConfig(config: KypoConfig) {
    ((window as unknown) as ExtendedWindow).kypoConfig = config;
  }
}
