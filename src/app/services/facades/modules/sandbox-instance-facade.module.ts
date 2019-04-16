import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SandboxInstanceFacade} from "../sandbox-instance-facade.service";
import {SandboxInstanceMapper} from "../../mappers/sandbox-instance-mapper.service";

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    SandboxInstanceFacade,
    SandboxInstanceMapper
  ]
})
export class SandboxInstanceFacadeModule {

}
