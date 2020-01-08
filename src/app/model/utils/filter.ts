/**
 * Creates filter for api services that support filtering of results
 */
export class Filter {
  paramName: string;
  value: string;

  constructor(paramName: string, value: string) {
    this.paramName = paramName;
    this.value = value;
  }
}
