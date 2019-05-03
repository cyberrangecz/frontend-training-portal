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
    return result;
  }

  private getSandboxStateFromString(state: string): SandboxInstanceState {
    return (<any>SandboxInstanceState)[state];
  }
}
