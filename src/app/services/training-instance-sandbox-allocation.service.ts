import {Injectable} from "@angular/core";
import {SandboxAllocationEnum} from "../enums/sandbox-allocation-state.enum";
import {AlertTypeEnum} from "../enums/alert-type.enum";
import {AlertService} from "./event-services/alert.service";

@Injectable()
export class TrainingInstanceSandboxAllocationService {
  poolId: number;
  state: SandboxAllocationEnum;

  constructor(private alertService: AlertService) {
    this.state = SandboxAllocationEnum.NONE;
  }

  setPoolId(poolId: number) {
    this.poolId = poolId;
    this.state = SandboxAllocationEnum.POOL_OBTAINED;
    this.alertService.emitAlert(AlertTypeEnum.Info, 'Pool was obtained. Sandbox allocation will begin');
  }

  begin() {
    this.state = SandboxAllocationEnum.IN_PROGRESS;
    // TODO periodic check on sandbox rest api
  }

  fail() {
    this.state = SandboxAllocationEnum.FAILED;
    this.alertService.emitAlert(AlertTypeEnum.Error, 'Error during allocation of sandboxes.');
  }

  finish() {
    this.state = SandboxAllocationEnum.FINISHED;
    this.alertService.emitAlert(AlertTypeEnum.Info, 'Sandboxes were successfully allocated');
  }
}
