import { DynamicEnvironment } from '@sentinel/common/dynamic-env';
import { KypoConfig } from '../app/utils/config';

export class KypoDynamicEnvironment {
  public static getConfig(): KypoConfig {
    return DynamicEnvironment.getConfig<KypoConfig>();
  }
}
