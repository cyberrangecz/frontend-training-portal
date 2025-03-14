import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SentinelAuthConfig, SentinelAuthErrorHandler, SentinelAuthModule } from '@sentinel/auth';
import { SentinelAuthGuardWithLogin, SentinelNegativeAuthGuard } from '@sentinel/auth/guards';
import { AdvancedUserGuard } from './services/guards/advanced-user.guard.service';
import { SandboxDesignerGuard } from './services/guards/sandbox-designer-guard.service';
import { SandboxOrganizerGuard } from './services/guards/sandbox-organizer-guard.service';
import { TraineeGuard } from './services/guards/trainee-guard.service';
import { TrainingDesignerGuard } from './services/guards/training-designer-guard.service';
import { TrainingOrganizerGuard } from './services/guards/training-organizer-guard.service';
import { UserAndGroupGuard } from './services/guards/user-and-group-guard.service';
import { ErrorHandlerService } from './services/shared/error-handler.service';
import { PortalConfig } from './utils/config';
import { APP_CONFIG, configurableModuleFactory } from '@sentinel/common/dynamic-env';
import { AdaptiveTrainingOrganizerGuard } from './services/guards/training-adaptive-organizer-guard.service';
import { AdaptiveTrainingDesignerGuard } from './services/guards/training-adaptive-designer-guard.service';

@NgModule({
    imports: [CommonModule, SentinelAuthModule.forRoot(null)],
    providers: [
        SandboxDesignerGuard,
        SandboxOrganizerGuard,
        TrainingDesignerGuard,
        TrainingOrganizerGuard,
        AdaptiveTrainingDesignerGuard,
        AdaptiveTrainingOrganizerGuard,
        UserAndGroupGuard,
        TraineeGuard,
        AdvancedUserGuard,
        SentinelAuthGuardWithLogin,
        SentinelNegativeAuthGuard,
        {
            provide: SentinelAuthConfig,
            useFactory: configurableModuleFactory<PortalConfig>('authConfig'),
            deps: [APP_CONFIG],
        },
        {
            provide: SentinelAuthErrorHandler,
            useClass: ErrorHandlerService,
        },
    ],
})
export class AuthModule {}
