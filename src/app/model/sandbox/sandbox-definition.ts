export class SandboxDefinition {
  id: number;
  title: string;
  authors: number[];


  constructor(title: string, authors: number[]) {
    this.title = title;
    this.authors = authors;
  }
}
