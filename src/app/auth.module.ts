import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Kypo2AuthConfig, Kypo2AuthInterceptor, Kypo2AuthModule } from 'kypo2-auth';
import { OnlyTraineeGuard } from './services/guards/only-trainee.guard.service';
import { SandboxDesignerGuard } from './services/guards/sandbox-designer-guard.service';
import { SandboxOrganizerGuard } from './services/guards/sandbox-organizer-guard.service';
import { TraineeGuard } from './services/guards/trainee-guard.service';
import { TrainingDesignerGuard } from './services/guards/training-designer-guard.service';
import { TrainingOrganizerGuard } from './services/guards/training-organizer-guard.service';
import { UserAndGroupGuard } from './services/guards/user-and-group-guard.service';
import { APP_CONFIG, configurableModuleFactory } from './services/shared/config.provider';

@NgModule({
  imports: [CommonModule, Kypo2AuthModule.forRoot(null)],
  providers: [
    SandboxDesignerGuard,
    SandboxOrganizerGuard,
    TrainingDesignerGuard,
    TrainingOrganizerGuard,
    UserAndGroupGuard,
    TraineeGuard,
    OnlyTraineeGuard,
    { provide: HTTP_INTERCEPTORS, useClass: Kypo2AuthInterceptor, multi: true },
    {
      provide: Kypo2AuthConfig,
      useFactory: configurableModuleFactory('authConfig'),
      deps: [APP_CONFIG],
    },
  ],
})
export class AuthModule {}
