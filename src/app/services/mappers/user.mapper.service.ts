import {User} from "../../model/user/user";
import {UserRoleEnum} from "../../enums/user-role.enum";
import {RoleDTO} from "../../model/DTOs/user/role-dto";
import {UserBasicInfoDTO} from "../../model/DTOs/user/user-basic-info-dto";
import {UserRefDTO} from '../../model/DTOs/user/user-ref-dto';
import {UserInfoDTO} from '../../model/DTOs/user/user-info-dto';

export class UserMapper {

  mapUsersFromUserRefDTOs(users: UserRefDTO[]): User[] {
    if (!users) {
      return [];
    }
    return users.map(userDTO =>  this.mapUserFromUserRefDTO(userDTO));
  }

  mapUserFromUserRefDTO(userDTO: UserRefDTO): User {
    const user = new User();
    user.login = userDTO.user_ref_login;
    user.name = userDTO.user_ref_full_name;
    return user;
  }

  mapUserRefDTOsFromUsers(users: User[]): UserRefDTO[] {
    return users.map(user => this.mapUserRefDTOFromUser(user));
  }

  mapUserRefDTOFromUser(user: User): UserRefDTO {
    const userRef = new UserRefDTO();
    userRef.user_ref_login = user.login;
    userRef.user_ref_full_name = user.name;
    return userRef;
  }

  mapUserInfoDTOsToOrganizerUsers(userDTOs: UserInfoDTO[]): User[] {
    return userDTOs.map(userDTO =>
      this.mapUserInfoDTOToOrganizerUser(userDTO));
  }

  mapUserInfoDTOToOrganizerUser(userDTO: UserInfoDTO): User {
    const user = new User();
    user.login = userDTO.login;
    user.name = userDTO.full_name;
    user.roles.add(UserRoleEnum.Organizer);
    return user;
  }

  mapUserInfoDTOsToDesignerUsers(userDTOs: UserInfoDTO[]): User[] {
    return userDTOs.map(userDTO =>
      this.mapUserInfoDTOToDesignerUser(userDTO));
  }

  mapUserInfoDTOToDesignerUser(userDTO: UserInfoDTO): User {
    const user = new User();
    user.login = userDTO.login;
    user.name = userDTO.full_name;
    user.roles.add(UserRoleEnum.Designer);
    return user;
  }

  mapRoleDTOsToRoles(roles: [RoleDTO]): UserRoleEnum[] {
    return roles.map(roleDTO => this.mapStringToRole(roleDTO.role_type));
  }

  mapStringToRole(role: string): UserRoleEnum {
    switch (role.toUpperCase()) {
      case 'DESIGNER': return UserRoleEnum.Designer;
      case 'ORGANIZER': return UserRoleEnum.Organizer;
      case 'TRAINEE': return UserRoleEnum.Trainee;
    }
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
