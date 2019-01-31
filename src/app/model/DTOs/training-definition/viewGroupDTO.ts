import {UserRefDTO} from "../user/userRefDTO";

export class ViewGroupDTO {
  id: number;
  title: string;
  description: string;
  organizers: UserRefDTO[];
}
