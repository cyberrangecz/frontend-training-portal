import {InjectionToken} from '@angular/core';
import {ExtendedWindow, KypoConfig} from '../../utils/config';

export const APP_CONFIG: InjectionToken<KypoConfig> = new InjectionToken<KypoConfig>('KypoConfig');

const appConfigFactory = (): KypoConfig => (window as unknown as ExtendedWindow).kypoConfig;

export const appConfigProvider: any = { provide: APP_CONFIG, useFactory: appConfigFactory };

export const configurableModuleFactory = (prop: string) => (kypoConfig: KypoConfig): any => kypoConfig[prop];
