import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { AppModule } from './app/app.module';
import { PortalConfig } from './app/utils/config';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { SentinelBootstrapper } from '@sentinel/common/dynamic-env';

if (environment.production) {
    enableProdMode();
}

SentinelBootstrapper.bootstrap<AppModule, PortalConfig>('assets/config.json', AppModule, platformBrowserDynamic());
