export class JavaEntityErrorDetail {
  entity: string;
  identifier: string;
  identifier_value: string;
  reason: string;

  toString(): string {
    return `EntityErrorDetail: Entity ${this.entity} with identifier ${this.identifier} of value ${this.identifier_value} failed because of reason ${this.reason}`;
  }
}
