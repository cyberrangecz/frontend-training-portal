import {UserRefDTO} from "../user/user-ref-dto";

export class ViewGroupDTO {
  id: number;
  title: string;
  description: string;
  organizers: UserRefDTO[];
}
