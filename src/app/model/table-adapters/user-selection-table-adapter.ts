import {User} from 'kypo2-auth';
import {StringNormalizer} from "../utils/ignore-diacritics-filter";

export class UserSelectionTableAdapter {
  user: User;
  selected: boolean;
  isActiveUser: boolean;
  selectionDisabled: boolean;
  normalizedName: string;

  constructor(user: User, selected: boolean, isActiveUser: boolean, selectionDisabled: boolean) {
    this.user = user;
    this.selected = selected;
    this.isActiveUser = isActiveUser;
    this.selectionDisabled = selectionDisabled;
    this.normalizedName = StringNormalizer.normalizeDiacritics(user.name).toLowerCase();
  }
}
