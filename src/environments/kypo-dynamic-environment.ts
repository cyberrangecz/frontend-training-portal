import { DynamicEnvironment } from '@sentinel/common';
import { KypoConfig } from '../app/utils/config';

export class KypoDynamicEnvironment {
  public static getConfig(): KypoConfig {
    return DynamicEnvironment.getConfig<KypoConfig>();
  }
}
