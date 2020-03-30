import {Injectable} from '@angular/core';
import {PoolEditService} from './pool-edit.service';
import {Pool} from 'kypo-sandbox-model';
import {from, Observable} from 'rxjs';
import {Router} from '@angular/router';
import {switchMap, tap} from 'rxjs/operators';
import {AlertService} from '../../shared/alert.service';
import {AlertTypeEnum} from '../../../model/enums/alert-type.enum';
import {ErrorHandlerService} from '../../shared/error-handler.service';
import {RouteFactory} from '../../../model/routes/route-factory';
import {MatDialog} from '@angular/material/dialog';
import {SandboxDefinitionSelectComponent} from '../../../components/sandbox-instance/sandbox-pool-edit/sandbox-definition-select/sandbox-definition-select.component';
import {SandboxDefinition} from 'kypo-sandbox-model';
import {PoolApi} from 'kypo-sandbox-api';

@Injectable()
export class PoolEditConcreteService extends PoolEditService {

  constructor(private router: Router,
              private alertService: AlertService,
              private dialog: MatDialog,
              private errorHandler: ErrorHandlerService,
              private api: PoolApi) {
    super();
  }

  create(pool: Pool): Observable<any> {
    return this.api.createPool(pool)
      .pipe(
        tap(_ => this.alertService.emitAlert(AlertTypeEnum.Success, 'Pool was created'),
          err => this.errorHandler.emit(err, 'Creating pool')),
        switchMap(_ => from(this.router.navigate([RouteFactory.toPoolOverview()])))
      )
  }

  selectDefinition(currSelected: SandboxDefinition): Observable<SandboxDefinition> {
    const dialogRef = this.dialog.open(SandboxDefinitionSelectComponent, { data: currSelected });
    return dialogRef.afterClosed();
  }
}
