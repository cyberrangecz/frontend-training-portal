import {User} from "./user";

export class ViewGroup {
  title: string;
  description: string;
  organizers: Array<User | string>;
}
