import {JavaApiError} from './java-api-error';

export class JavaApiMicroserviceError extends JavaApiError{
  api_sub_error: any;

  toString(): string {
    return super.toString() + `
    Error was caused by another microservice with following error: ${this.api_sub_error}`
  }
}
