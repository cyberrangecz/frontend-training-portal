import {User, UserDTO} from 'kypo2-auth';

export class UserMapper {
  static fromDTO(dto: UserDTO): User {
    return User.fromDTO(dto);
  }

  static fromDTOs(dtos: UserDTO[]): User[] {
    return dtos.map(dto => UserMapper.fromDTO(dto));
  }
}
