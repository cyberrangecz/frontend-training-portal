import { DynamicEnvironment } from '@sentinel/common/dynamic-env';
import { PortalConfig } from '../app/utils/config';

export class DynamicEnvironment {
  public static getConfig(): PortalConfig {
    return DynamicEnvironment.getConfig<PortalConfig>();
  }
}
