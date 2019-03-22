import {UserRoleEnum} from "../../enums/user-role.enum";
import {Set} from 'typescript-collections/'

/**
 * Object representing user in a system. User has unique id generated by backend, name and set of roles.
 */
export class User {
  id: number;
  login: string; // unique
  name: string;
  mail: string;
  groupIds: number[];
  roles: Set<UserRoleEnum>;

  constructor(roles?: UserRoleEnum[]) {
    this.roles = new Set();
    if (roles) {
      roles.forEach(role => this.roles.add(role));
    }
  }


  toString(): string {
    return this.name;
  }
}
