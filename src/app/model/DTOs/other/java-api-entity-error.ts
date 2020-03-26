import {JavaApiError} from './java-api-error';
import {JavaEntityErrorDetail} from './java-entity-error-detail';

export class JavaApiEntityError extends JavaApiError {
  entity_error_detail: JavaEntityErrorDetail;

  toString(): string {
    return super.toString() + '\n' + this.entity_error_detail.toString();
  }
}
