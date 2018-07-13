import {UserRoleEnum} from "../../enums/user-role.enum";
import {Set} from 'typescript-collections/'

export class User {
  id: number;
  name: string;
  roles: Set<UserRoleEnum>;


  constructor(id: number, name: string, roles: Set<UserRoleEnum>) {
    this.id = id;
    this.name = name;
    this.roles = roles;
  }

  toString(): string {
    return 'id: ' + this.id + '\n'
    + 'name: ' + this.name + '\n'
  }
}
