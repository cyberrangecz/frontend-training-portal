import {SandboxDefinitionDetailService} from './sandbox-definition-detail.service';
import {SandboxDefinitionCreateInfo} from '../../../model/sandbox/definition/sandbox-definition-create-info';
import {Observable} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';
import {AlertTypeEnum} from '../../../model/enums/alert-type.enum';
import {SandboxDefinitionApi} from '../../api/sandbox-definition-api.service';
import {AlertService} from '../../shared/alert.service';
import {ErrorHandlerService} from '../../shared/error-handler.service';
import {RouteFactory} from '../../../model/routes/route-factory';
import {Router} from '@angular/router';
import {Injectable} from '@angular/core';

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
   * @param sandboxDefinitionInfo container for attributes required for sandbox definition creation
   */
  create(sandboxDefinitionInfo: SandboxDefinitionCreateInfo): Observable<any> {
    return this.api.create(sandboxDefinitionInfo.sandboxGitlabUrl, sandboxDefinitionInfo.sandboxRevision)
      .pipe(
        tap(_ => this.alertService.emitAlert(AlertTypeEnum.Success, 'Sandbox definition was successfully created'),
          err => this.errorHandler.emit(err, 'Creating sandbox definition')
        ),
        switchMap(_ => this.router.navigate([RouteFactory.toSandboxDefinitionOverview()]))
      );
  }
}
