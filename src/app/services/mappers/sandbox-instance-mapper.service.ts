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
    result.stateLabel = sandboxDTO.status.replace(new RegExp('_', 'g'), ' ');
    result.stateErrorMessage = sandboxDTO.status_reason;
    return result;
  }

  private getSandboxStateFromString(state: string): SandboxInstanceState {
    const lowercasedState = state.toLowerCase();
    if (lowercasedState.includes('fail')) {
      return SandboxInstanceState.FAILED;
    }
    if (lowercasedState.includes('delete') && !lowercasedState.includes('fail')) {
      return SandboxInstanceState.DELETE_IN_PROGRESS;
    }
    if (lowercasedState.includes('progress')) {
      return SandboxInstanceState.IN_PROGRESS;
    }
    if (state.toLowerCase().includes('complete')) {
      return SandboxInstanceState.COMPLETE;
    }
    else {
      return undefined;
    }
  }
}
