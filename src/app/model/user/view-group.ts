import {User} from "./user";

export class ViewGroup {
  id: number;
  title: string;
  description: string;
  organizers: Array<User | string>;
}
