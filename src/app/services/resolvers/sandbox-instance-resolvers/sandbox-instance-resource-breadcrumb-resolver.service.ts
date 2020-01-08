import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {SandboxInstanceResourceResolver} from './sandbox-instance-resource-resolver.service';
import {SandboxInstanceResource} from '../../../model/sandbox/pool/sandbox-instance/sandbox-instance-resource/sandbox-instance-resource';
import {map} from 'rxjs/operators';

/**
 * Router breadcrumb title provider
 */
@Injectable()
export class SandboxInstanceResourceBreadcrumbResolver implements Resolve<string> {

  constructor(private resourceResolver: SandboxInstanceResourceResolver) {
  }

  /**
   * Retrieves a breadcrumb title based on provided url
   * @param route route snapshot
   * @param state router state snapshot
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string> | Promise<string> | string {
    const resource$ = this.resourceResolver.resolve(route, state) as Observable<SandboxInstanceResource>;
    return resource$.pipe(map(resource => resource.name));
  }
}
