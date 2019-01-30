import {User} from "../../model/user/user";
import {UserRoleEnum} from "../../enums/user-role.enum";

export class UserMapper {

  getOrganizersFromLogins(logins: string[]): User[] {
    return logins.map(login =>
      this.getOrganizerFromLogin(login));
  }

  getOrganizerFromLogin(login: string): User {
    const user = new User();
    user.login = login;
    user.roles.add(UserRoleEnum.Organizer);
    return user;
  }

  getDesignersFromLogins(logins: string[]): User[] {
    return logins.map(login =>
      this.getDesignerFromLogin(login));
  }

  getDesignerFromLogin(login: string): User {
    const user = new User();
    user.login = login;
    user.roles.add(UserRoleEnum.Designer);
    return user;
  }
}
