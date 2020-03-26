export class JavaApiError {
  errors: string[];
  message: string;
  path: string;
  status: string;
  timestamp: string;

  toString(): string {
    return `Message: ${this.message}
    Errors: ${this.errors}`
  }
}
