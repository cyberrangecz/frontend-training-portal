import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SentinelAuthService } from '@sentinel/auth';
import { SentinelAuthGuardWithLogin } from '@sentinel/auth/guards';
import { TRAINING_RUN_PATH } from '@crczp/training-agenda';
import { AbstractGuardService } from './abstract.guard.service';
import { RoleResolver } from '../../utils/role-resolver';

/**
 * Route guard determining if user is signed in and has any other role than trainee.
 * If not, user is redirected to training run page.
 */
@Injectable()
export class AdvancedUserGuard extends AbstractGuardService implements CanActivate {
    constructor(
        router: Router,
        authGuard: SentinelAuthGuardWithLogin,
        private authService: SentinelAuthService,
    ) {
        super(router, authGuard, TRAINING_RUN_PATH);
    }

    protected hasRole(): boolean {
        const roles = this.authService.getRoles();
        return (
            !RoleResolver.isTrainingTrainee(roles) ||
            RoleResolver.isTrainingOrganizer(roles) ||
            RoleResolver.isTrainingDesigner(roles) ||
            RoleResolver.isUserAndGroupAdmin(roles)
        );
    }
}
