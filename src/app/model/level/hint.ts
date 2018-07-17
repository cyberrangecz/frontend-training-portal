export class Hint {
  id: number;
  gameLevelId: number;
  title: string;
  content: Blob; // HTML
  hintPenalty: number = 0;


  constructor(id: number, gameLevelId: number, title: string, content: Blob, hintPenalty: number) {
    this.id = id;
    this.gameLevelId = gameLevelId;
    this.title = title;
    this.content = content;
    this.hintPenalty = hintPenalty;
  }
}
