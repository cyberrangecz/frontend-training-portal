import { CanActivate, Router } from '@angular/router';
import { SentinelAuthGuardWithLogin } from '@sentinel/auth/guards';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CanActivateToObservable } from './can-activate-to-observable';

/**
 * Route guard determining if user is signed in and has a specific role.
 * If true, the guard allows the user to navigate to the desired route.
 * If false, the guard redirects the user to the specified route, if provided.
 */
export abstract class AbstractGuardService implements CanActivate {
    constructor(
        private router: Router,
        private authGuard: SentinelAuthGuardWithLogin,
        private onFailRedirect?: string,
    ) {}

    canActivate(): Observable<boolean> | Promise<boolean> | boolean {
        return CanActivateToObservable.convert(this.authGuard.canActivate()).pipe(
            map((canActivate) => (canActivate ? this.evaluatePermissions() : false)),
        );
    }

    private evaluatePermissions(): boolean {
        if (this.hasRole()) {
            return true;
        }
        if (this.onFailRedirect) {
            this.router.navigate([this.onFailRedirect]);
        }
        return true;
    }

    protected abstract hasRole(): boolean;
}
