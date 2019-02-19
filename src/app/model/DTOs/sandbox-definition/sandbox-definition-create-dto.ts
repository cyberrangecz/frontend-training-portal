import {SandboxDefinitionHostsDTO} from "./sandbox-definition-hosts-dto";
import {SandboxDefinitionNetworksDTO} from "./sandbox-definition-networks-dto";
import {SandboxDefinitionRoutersDTO} from "./sandbox-definition-routers-dto";

export class SandboxDefinitionCreateDTO {
  block_internet: string[][];
  hosts: SandboxDefinitionHostsDTO[];
  include_user_access: string[];
  name: string;
  net_mappings: string[][];
  networks: SandboxDefinitionNetworksDTO[];
  router_mappings: string[][];
  routers: SandboxDefinitionRoutersDTO[];
}
