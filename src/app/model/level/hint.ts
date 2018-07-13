import {GameLevel} from "./game-level";

export class Hint {
  id: number;
  gameLevel: GameLevel;
  title: string;
  content: Blob; // HTML
  hintPenalty: number = 0;


  constructor(id: number, gameLevel: GameLevel, title: string, content: Blob, hintPenalty: number) {
    this.id = id;
    this.gameLevel = gameLevel;
    this.title = title;
    this.content = content;
    this.hintPenalty = hintPenalty;
  }
}
