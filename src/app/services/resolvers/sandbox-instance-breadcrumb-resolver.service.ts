import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {SandboxInstance} from '../../model/sandbox/pool/sandbox-instance';
import {SandboxInstanceResolver} from './sandbox-instance-resolver.service';

@Injectable()
export class SandboxInstanceBreadcrumbResolver implements Resolve<string> {

  constructor(private sandboxInstanceResolver: SandboxInstanceResolver) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string> | Promise<string> | string {
    const sandboxInstance$ = this.sandboxInstanceResolver.resolve(route, state) as Observable<SandboxInstance>;
    return sandboxInstance$.pipe(map(sandboxInstance => `Sandbox ${sandboxInstance.id}`));
  }
}
