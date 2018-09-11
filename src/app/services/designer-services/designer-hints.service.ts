import {Injectable} from "@angular/core";
import {GameLevel} from "../../model/level/game-level";
import {Hint} from "../../model/level/hint";

@Injectable()
export class DesignerHintsService {
  level: GameLevel;
  hints: Hint[];
}
