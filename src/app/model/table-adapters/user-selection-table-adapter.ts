import {User} from 'kypo2-auth';

export class UserSelectionTableAdapter {
  user: User;
  selected: boolean;
  isActiveUser: boolean;
  selectionDisabled: boolean;


  constructor(user: User, selected: boolean, isActiveUser: boolean, selectionDisabled: boolean) {
    this.user = user;
    this.selected = selected;
    this.isActiveUser = isActiveUser;
    this.selectionDisabled = selectionDisabled;
  }
}
