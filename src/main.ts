import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { AppModule } from './app/app.module';
import { KypoConfig } from './app/utils/config';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { SentinelBootstrapper } from '@sentinel/common/dynamic-env';

if (environment.production) {
  enableProdMode();
}

SentinelBootstrapper.bootstrap<AppModule, KypoConfig>('assets/kypo-config.json', AppModule, platformBrowserDynamic());
