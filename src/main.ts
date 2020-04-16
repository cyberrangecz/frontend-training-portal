import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { KypoConfig } from './app/utils/config';
import { DynamicEnvironment } from './environments/dynamic-environment';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

fetch('assets/kypo-config.json')
  .then((response) => response.json())
  .then((config: KypoConfig) => {
    DynamicEnvironment.setConfig(config);
    platformBrowserDynamic()
      .bootstrapModule(AppModule)
      .catch((err) => console.error(err));
  })
  .catch((err) => console.error(err));
