import {User} from "../../model/user/user";
import {UserRoleEnum} from "../../enums/user-role.enum";
import {RoleDTO} from "../../model/DTOs/user/role-dto";
import {UserBasicInfoDTO} from "../../model/DTOs/user/user-basic-info-dto";

export class UserMapper {

  mapLoginsToOrganizerUsers(logins: string[]): User[] {
    return logins.map(login =>
      this.mapLoginToOrganizerUser(login));
  }

  mapLoginToOrganizerUser(login: string): User {
    const user = new User();
    user.login = login;
    user.roles.add(UserRoleEnum.Organizer);
    return user;
  }

  mapLoginsToDesignerUsers(logins: string[]): User[] {
    return logins.map(login =>
      this.mapLoginToDesignerUser(login));
  }

  mapLoginToDesignerUser(login: string): User {
    const user = new User();
    user.login = login;
    user.roles.add(UserRoleEnum.Designer);
    return user;
  }

  mapRoleDTOsToRoles(roles: [RoleDTO]): UserRoleEnum[] {
    return roles.map(roleDTO => this.mapStringToRole(roleDTO.role_type));
  }

  mapStringToRole(role: string): UserRoleEnum {
    return UserRoleEnum[role.toLowerCase()];
  }

  mapUserBasicInfoDTOToUser(userInfoDTO: UserBasicInfoDTO): User {
    const user = new User();
    user.id = userInfoDTO.id;
    user.login = userInfoDTO.login;
    user.mail = userInfoDTO.mail;
    user.name = userInfoDTO.full_name;
    user.groupIds = userInfoDTO.group_ids;
    return user;
  }
}
