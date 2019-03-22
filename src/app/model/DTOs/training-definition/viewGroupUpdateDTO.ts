import {UserBasicDTO} from "../user/user-basic-dto";

export class ViewGroupUpdateDTO {
  id: number;
  title: string;
  description: string;
  organizers: UserBasicDTO[];
}
