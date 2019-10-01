export class Filter {
  paramName: string;
  value: string;

  constructor(paramName: string, value: string) {
    this.paramName = paramName;
    this.value = value;
  }
}
