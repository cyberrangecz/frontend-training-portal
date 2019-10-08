import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {SandboxInstanceResolver} from './sandbox-instance-resolver.service';
import {Observable} from 'rxjs';
import {SandboxInstance} from '../../model/sandbox/pool/sandbox-instance';
import {map} from 'rxjs/operators';

@Injectable()
export class SandboxInstanceBreadcrumbResolver implements Resolve<string> {

  constructor(private sandboxInstanceResolver: SandboxInstanceResolver) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string> | Promise<string> | string {
    const sandboxInstance$ = this.sandboxInstanceResolver.resolve(route, state) as Observable<SandboxInstance>;
    return sandboxInstance$.pipe(map(sandboxInstance => `Sandbox ${sandboxInstance.id}`));
  }
}
