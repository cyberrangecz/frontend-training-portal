import {AbstractLevel} from "./abstract-level";
import {AbstractLevelTypeEnum} from "../../enums/abstract-level-type.enum";

/**
 * Class representing single level in a training of type Info
 */
export class InfoLevel extends AbstractLevel {
  content: string;
  constructor() {
    super();
  }
}
