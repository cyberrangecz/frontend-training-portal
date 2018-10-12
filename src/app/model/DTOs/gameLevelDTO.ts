import {PostHookDTO} from "./postHookDTO";
import {PreHookDTO} from "./preHookDTO";
import {AbstractLevelDTO} from "./abstractLevelDTO";

export interface GameLevelDTO extends AbstractLevelDTO {
  attachments?: Array<string>;
  content?: string;
  estimatedDuration?: number;
  flag?: string;
  incorrectFlagLimit?: number;
  solution?: string;
  solutionPenalized?: boolean;
}
