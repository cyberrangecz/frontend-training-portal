import {Injectable} from "@angular/core";

@Injectable()
export class TrainingInstanceSandboxAllocationService {
  poolId: number;
  state: AllocationStateEnum;
}
