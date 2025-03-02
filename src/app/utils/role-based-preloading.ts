import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { SentinelAuthService } from '@sentinel/auth';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class RoleBasedPreloader implements PreloadingStrategy {
    constructor(private authService: SentinelAuthService) {}

    preload(route: Route, load: () => Observable<any>): Observable<any> {
        const roles = this.authService.getRoles();

        const hasResolverFn = route.data && route.data['roleResolver'];

        if (hasResolverFn) {
            if (route.data['roleResolver'](roles)) {
                // The user has the required role, load the module
                return load();
            }
            // The user doesn't have the required role, ignore the module
            return of(null);
        }

        // The route doesn't have a required role, load the module
        return load();
    }
}
