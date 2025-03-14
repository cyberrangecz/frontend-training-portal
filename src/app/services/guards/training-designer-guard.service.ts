import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SentinelAuthService } from '@sentinel/auth';
import { SentinelAuthGuardWithLogin } from '@sentinel/auth/guards';
import { HOME_PATH } from '../../paths';
import { AbstractGuardService } from './abstract.guard.service';
import { RoleResolver } from '../../utils/role-resolver';

@Injectable()
/**
 * Route guard determining if user is signed in and has role of a designer.
 */
export class TrainingDesignerGuard extends AbstractGuardService implements CanActivate {
    constructor(
        router: Router,
        authGuard: SentinelAuthGuardWithLogin,
        private authService: SentinelAuthService,
    ) {
        super(router, authGuard, HOME_PATH);
    }

    protected hasRole = () => RoleResolver.isTrainingDesigner(this.authService.getRoles());
}
