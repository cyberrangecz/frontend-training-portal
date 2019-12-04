import {User} from 'kypo2-auth';

export class UserRow {
  user: User;
  selected: boolean;
  isActiveUser: boolean;

  constructor(user: User) {
    this.user = user;
  }
}
