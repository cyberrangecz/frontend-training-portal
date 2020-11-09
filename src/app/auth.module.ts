import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SentinelAuthConfig, SentinelAuthErrorHandler, SentinelAuthModule } from '@sentinel/auth';
import { SentinelAuthGuardWithLogin, SentinelNegativeAuthGuard } from '@sentinel/auth/guards';
import { OnlyTraineeGuard } from './services/guards/only-trainee.guard.service';
import { SandboxDesignerGuard } from './services/guards/sandbox-designer-guard.service';
import { SandboxOrganizerGuard } from './services/guards/sandbox-organizer-guard.service';
import { TraineeGuard } from './services/guards/trainee-guard.service';
import { TrainingDesignerGuard } from './services/guards/training-designer-guard.service';
import { TrainingOrganizerGuard } from './services/guards/training-organizer-guard.service';
import { UserAndGroupGuard } from './services/guards/user-and-group-guard.service';
import { APP_CONFIG, configurableModuleFactory } from '@sentinel/common';
import { ErrorHandlerService } from './services/shared/error-handler.service';
import { KypoConfig } from './utils/config';

@NgModule({
  imports: [CommonModule, SentinelAuthModule.forRoot(null)],
  providers: [
    SandboxDesignerGuard,
    SandboxOrganizerGuard,
    TrainingDesignerGuard,
    TrainingOrganizerGuard,
    UserAndGroupGuard,
    TraineeGuard,
    OnlyTraineeGuard,
    SentinelAuthGuardWithLogin,
    SentinelNegativeAuthGuard,
    {
      provide: SentinelAuthConfig,
      useFactory: configurableModuleFactory<KypoConfig>('authConfig'),
      deps: [APP_CONFIG],
    },
    {
      provide: SentinelAuthErrorHandler,
      useClass: ErrorHandlerService,
    },
  ],
})
export class AuthModule {}
