import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { AppModule } from './app/app.module';
import { SentinelBootstrapper } from '@sentinel/common';
import { KypoConfig } from './app/utils/config';

if (environment.production) {
  enableProdMode();
}

SentinelBootstrapper.bootstrap<AppModule, KypoConfig>('assets/kypo-config.json', AppModule);
