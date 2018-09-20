import {BasicLevelInfoDto} from "../level/basic-level-info-dto";
import {SandboxDefinitionRefDto} from "../sandbox-definition/sandbox-definition-ref-dto";
import {AuthorRefDto} from "../user/author-ref-dto";


export class TrainingDefinitionGetDto {

  authorRefDto: AuthorRefDto[];
  basicLevelInfoDtos: BasicLevelInfoDto[];
  description: string;
  id: number;
  outcomes: string[];
  prerequisities: string[];
  sandboxDefinitionRefDto: SandboxDefinitionRefDto;
  startingLevel: number;
  state: string;
  title: string;

  constructor() {

  }
}
