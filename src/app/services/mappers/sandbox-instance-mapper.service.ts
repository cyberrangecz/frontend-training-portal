import {Injectable} from "@angular/core";
import {SandboxInstanceDTO} from "../../model/DTOs/sandbox-instance/sandbox-instance-dto";
import {SandboxInstance} from "../../model/sandbox/sandbox-instance";
import {SandboxInstanceState} from "../../model/enums/sandbox-instance-state";

@Injectable()
export class SandboxInstanceMapper {

  mapSandboxInstanceDTOsToSandboxInstances(sandboxDTOs: SandboxInstanceDTO[]): SandboxInstance[] {
    return sandboxDTOs.map(sandboxDTO => this.mapSandboxInstanceDTOToSandboxInstance(sandboxDTO));
  }

  mapSandboxInstanceDTOToSandboxInstance(sandboxDTO: SandboxInstanceDTO): SandboxInstance {
    const result = new SandboxInstance();
    result.id = sandboxDTO.id;
    result.poolId = sandboxDTO.pool;
    result.state = this.getSandboxStateFromString(sandboxDTO.status);
    result.stateErrorMessage = sandboxDTO.status_reason;
    return result;
  }

  private getSandboxStateFromString(state: string): SandboxInstanceState {
    const knownState = (<any>SandboxInstanceState)[state];
    if (knownState !== undefined || knownState !== null) {
      return knownState;
    }
    else {
      const stateString = state.toLowerCase();
      if (stateString.includes('progress')) {
        return SandboxInstanceState.IN_PROGRESS;
      }
      if (stateString.includes('fail')) {
        return SandboxInstanceState.FAILED;
      }
      if (state.toLowerCase().includes('complete')) {
        return SandboxInstanceState.COMPLETE;
      }
      else {
        return undefined;
      }
    }
  }
}
