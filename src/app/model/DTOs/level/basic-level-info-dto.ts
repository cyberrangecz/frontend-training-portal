export class BasicLevelInfoDto {
  id: number;
  levelType: string;
  order: number;
  title: string;


  constructor(id: number, levelType: string, order: number, title: string) {
    this.id = id;
    this.levelType = levelType;
    this.order = order;
    this.title = title;
  }
}
