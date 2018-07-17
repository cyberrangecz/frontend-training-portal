export class SandboxDefinition {
  id: number;
  title: string;
  authors: number[];


  constructor(id: number, title: string, authors: number[]) {
    this.id = id;
    this.title = title;
    this.authors = authors;
  }
}
