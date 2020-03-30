import {SandboxDefinitionDetailService} from './sandbox-definition-detail.service';
import {Observable} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';
import {AlertTypeEnum} from '../../../model/enums/alert-type.enum';
import {SandboxDefinitionApi} from 'kypo-sandbox-api';
import {AlertService} from '../../shared/alert.service';
import {ErrorHandlerService} from '../../shared/error-handler.service';
import {RouteFactory} from '../../../model/routes/route-factory';
import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {SandboxDefinition} from 'kypo-sandbox-model';

@Injectable()
export class SandboxDefinitionDetailConcreteService extends SandboxDefinitionDetailService {

  constructor(private api: SandboxDefinitionApi,
              private router: Router,
              private alertService: AlertService,
              private errorHandler: ErrorHandlerService) {
    super();
  }

  /**
   * Creates a sandbox definition, informs about the result and updates list of sandbox definitions or handles an error
   * @param sandboxDefinition Sandbox definition to create
   */
  create(sandboxDefinition: SandboxDefinition): Observable<any> {
    return this.api.create(sandboxDefinition)
      .pipe(
        tap(_ => this.alertService.emitAlert(AlertTypeEnum.Success, 'Sandbox definition was successfully created'),
          err => this.errorHandler.emit(err, 'Creating sandbox definition')
        ),
        switchMap(_ => this.router.navigate([RouteFactory.toSandboxDefinitionOverview()]))
      );
  }
}
