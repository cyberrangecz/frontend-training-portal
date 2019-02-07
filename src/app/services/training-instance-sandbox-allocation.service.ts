import {Injectable} from "@angular/core";
import {SandboxAllocationEnum} from "../enums/sandbox-allocation-state.enum";
import {AlertTypeEnum} from "../enums/alert-type.enum";
import {AlertService} from "./event-services/alert.service";
import {timer} from "rxjs";
import {mergeMap, takeWhile} from "rxjs/operators";
import {SandboxInstanceFacade} from "./facades/sandbox-instance-facade.service";
import {SandboxInstanceDTO} from "../model/DTOs/sandbox-instance/sandbox-instance-dto";

@Injectable()
export class TrainingInstanceSandboxAllocationService {
  poolId: number;
  state: SandboxAllocationEnum;

  constructor(private alertService: AlertService,
              private sandboxInstanceFacade: SandboxInstanceFacade) {
    this.state = SandboxAllocationEnum.NONE;
  }

  setPoolId(poolId: number) {
    this.poolId = poolId;
    this.state = SandboxAllocationEnum.POOL_OBTAINED;
    this.alertService.emitAlert(AlertTypeEnum.Info, 'Pool was obtained. Sandbox allocation will begin. This may take a few minutes.');
  }

  begin() {
    this.state = SandboxAllocationEnum.IN_PROGRESS;
    this.checkStatePeriodically();
  }

  fail() {
    this.state = SandboxAllocationEnum.FAILED;
    this.alertService.emitAlert(AlertTypeEnum.Error, 'Error during allocation of sandboxes.');
  }

  finish() {
    this.state = SandboxAllocationEnum.FINISHED;
    this.alertService.emitAlert(AlertTypeEnum.Info, 'Sandboxes were successfully allocated');
  }

  private checkStatePeriodically() {
    timer(10000)
      .pipe(
        takeWhile(() => this.state === SandboxAllocationEnum.IN_PROGRESS),
        mergeMap(() => this.sandboxInstanceFacade.getSandboxesInPool(this.poolId)))
      .subscribe(
        resp => {
          this.resolveSandboxAllocationState(resp);
        },
      err => {
          this.alertService.emitAlert(AlertTypeEnum.Warning, 'Could not reach sandbox info service. Sandboxes build may still be in progress');
      });
  }

  private resolveSandboxAllocationState(sandboxes: SandboxInstanceDTO[]) {
    let finishedSandboxesCount = 0;
    sandboxes.forEach(sandbox => {
      if (sandbox.status === 'CREATE_COMPLETE') {
        finishedSandboxesCount++;
      }
    });
    this.alertService.emitAlert(AlertTypeEnum.Info,
      finishedSandboxesCount + ' of total ' + finishedSandboxesCount + ' sandboxes were built.');
  }

}
