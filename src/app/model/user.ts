import {UserRolesEnum} from "../enums/user-roles.enum";
import {Set} from 'typescript-collections/'

export class User {
  id: number;
  name: string;
  roles: Set<UserRolesEnum>;


  constructor(id: number, name: string, roles: Set<UserRolesEnum>) {
    this.id = id;
    this.name = name;
    this.roles = roles;
  }

  toString(): string {
    return 'id: ' + this.id + '\n'
    + 'name: ' + this.name + '\n'
  }
}
