import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {AdminMicroserviceWrapperComponent} from '../../components/administration/admin-microservice/admin-microservice-wrapper/admin-microservice-wrapper.component';
import {Observable} from 'rxjs';

export class MicroserviceEditCanDeactivate implements CanDeactivate<AdminMicroserviceWrapperComponent> {

  canDeactivate(component: AdminMicroserviceWrapperComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return component.microserviceEditComponent.canDeactivate();
  }
}
