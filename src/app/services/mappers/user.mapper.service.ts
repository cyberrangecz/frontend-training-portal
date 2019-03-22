import {User} from "../../model/user/user";
import {UserRoleEnum} from "../../enums/user-role.enum";
import {RoleDTO} from "../../model/DTOs/user/role-dto";
import {UserInfoDTO} from "../../model/DTOs/user/user-info-dto";
import {UserRefDTO} from '../../model/DTOs/user/user-ref-dto';
import {UserBasicDTO} from '../../model/DTOs/user/user-basic-dto';

export class UserMapper {

  mapUserRefDTOsToUsers(users: UserRefDTO[]): User[] {
    if (!users) {
      return [];
    }
    return users.map(userDTO =>  this.mapUserRefDTOToUser(userDTO));
  }

  mapUserRefDTOToUser(userDTO: UserRefDTO): User {
    const user = new User();
    user.login = userDTO.user_ref_login;
    user.name = userDTO.user_ref_full_name;
    return user;
  }

  mapUsersToUserBasicDTOs(users: User[]): UserBasicDTO[] {
    return users.map(user => this.mapUserToUserBasicDTO(user));
  }

  mapUserToUserBasicDTO(user: User): UserBasicDTO {
    const userDTO = new UserBasicDTO();
    userDTO.login = user.login;
    userDTO.full_name = user.name;
    return userDTO;
  }

  mapUserBasicDTOsToOrganizerUsers(userDTOs: UserBasicDTO[]): User[] {
    return userDTOs.map(userDTO =>
      this.mapUserBasicDTOToOrganizerUser(userDTO));
  }

  mapUserBasicDTOToOrganizerUser(userDTO: UserBasicDTO): User {
    const user = new User();
    user.login = userDTO.login;
    user.name = userDTO.full_name;
    user.roles.add(UserRoleEnum.Organizer);
    return user;
  }

  mapUserBasicDTOsToDesignerUsers(userDTOs: UserBasicDTO[]): User[] {
    return userDTOs.map(userDTO =>
      this.mapUserInfoDTOToDesignerUser(userDTO));
  }

  mapUserInfoDTOToDesignerUser(userDTO: UserBasicDTO): User {
    const user = new User();
    user.login = userDTO.login;
    user.name = userDTO.full_name;
    user.roles.add(UserRoleEnum.Designer);
    return user;
  }

  mapRoleDTOsToRoles(roles: RoleDTO[]): UserRoleEnum[] {
    return roles.map(roleDTO => this.mapStringToRole(roleDTO.role_type));
  }

  mapStringToRole(role: string): UserRoleEnum {
    switch (role.toUpperCase()) {
      case 'ROLE_TRAINING_DESIGNER': return UserRoleEnum.Designer;
      case 'ROLE_TRAINING_ORGANIZER': return UserRoleEnum.Organizer;
      case 'ROLE_TRAINING_TRAINEE': return UserRoleEnum.Trainee;
      case 'ROLE_USER_AND_GROUP_ADMINISTRATOR': return UserRoleEnum.Admin;
    }
  }

  mapUserInfoDTOToUser(userInfoDTO: UserInfoDTO): User {
    const user = new User(this.mapRoleDTOsToRoles(userInfoDTO.roles));
    user.id = userInfoDTO.id;
    user.login = userInfoDTO.login;
    user.mail = userInfoDTO.mail;
    user.name = userInfoDTO.full_name;
    return user;
  }
}
