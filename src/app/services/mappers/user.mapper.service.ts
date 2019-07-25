import {UserRefDTO} from '../../model/DTOs/user/user-ref-dto';
import {UserBasicDTO} from '../../model/DTOs/user/user-basic-dto';
import {User, UserRole} from 'kypo2-auth';

export class UserMapper {

  mapUserRefDTOsToUsers(users: UserRefDTO[]): User[] {
    if (!users) {
      return [];
    }
    return users.map(userDTO =>  this.mapUserRefDTOToUser(userDTO));
  }

  mapUserRefDTOToUser(userDTO: UserRefDTO): User {
    const user = new User();
    user.login = userDTO.login;
    user.id = userDTO.user_ref_id;
    user.issuer = userDTO.iss;
    user.name = `${userDTO.given_name} ${userDTO.family_name}`;
    return user;
  }

  mapUserBasicDTOsToOrganizerUsers(userDTOs: UserBasicDTO[]): User[] {
    return userDTOs.map(userDTO =>
      this.mapUserBasicDTOToOrganizerUser(userDTO));
  }

  mapUserBasicDTOToOrganizerUser(userDTO: UserBasicDTO): User {
    const user = new User();
    user.login = userDTO.login;
    user.id = userDTO.user_ref_id;
    user.issuer = userDTO.iss;
    user.name = `${userDTO.given_name} ${userDTO.family_name}`;
    user.roles.add(UserRole.TRAINING_ORGANIZER);
    return user;
  }

  mapUserBasicDTOsToDesignerUsers(userDTOs: UserBasicDTO[]): User[] {
    return userDTOs.map(userDTO =>
      this.mapUserInfoDTOToDesignerUser(userDTO));
  }

  mapUserInfoDTOToDesignerUser(userDTO: UserBasicDTO): User {
    const user = new User();
    user.login = userDTO.login;
    user.id = userDTO.user_ref_id;
    user.issuer = userDTO.iss;
    user.name = `${userDTO.given_name} ${userDTO.family_name}`;
    user.roles.add(UserRole.TRAINING_DESIGNER);
    return user;
  }
}
