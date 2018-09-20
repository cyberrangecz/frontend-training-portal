export class AuthorRefDto {
  authorRefLogin: string;
  id: number;

  constructor(authorRefLogin: string, id: number) {
    this.authorRefLogin = authorRefLogin;
    this.id = id;
  }
}
