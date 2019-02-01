import {UserRefDTO} from "../user/user-ref-dto";

export class ViewGroupDTO {
  title: string;
  description: string;
  organizers: UserRefDTO[];
}
