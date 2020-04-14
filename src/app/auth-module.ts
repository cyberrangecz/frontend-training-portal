import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Kypo2AuthConfig, Kypo2AuthInterceptor, Kypo2AuthModule} from 'kypo2-auth';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {SandboxDesignerGuard} from './services/guards/sandbox-designer-guard.service';
import {SandboxOrganizerGuard} from './services/guards/sandbox-organizer-guard.service';
import {DesignerGuard} from './services/guards/designer-guard.service';
import {OrganizerGuard} from './services/guards/organizer-guard.service';
import {AdminGuard} from './services/guards/admin-guard.service';
import {TraineeGuard} from './services/guards/trainee-guard.service';
import {NotOnlyTraineeGuard} from './services/guards/only-trainee.guard.service';
import {APP_CONFIG, configurableModuleFactory} from './services/shared/config.provider';

@NgModule({
  imports: [
    CommonModule,
    Kypo2AuthModule.forRoot(null)
  ],
  providers: [
    SandboxDesignerGuard,
    SandboxOrganizerGuard,
    DesignerGuard,
    OrganizerGuard,
    AdminGuard,
    TraineeGuard,
    NotOnlyTraineeGuard,
    { provide: HTTP_INTERCEPTORS, useClass: Kypo2AuthInterceptor, multi: true },
    {
      provide: Kypo2AuthConfig,
      useFactory: configurableModuleFactory('authConfig'),
      deps: [APP_CONFIG],
    },
  ]
})
export class AuthModule {
}
