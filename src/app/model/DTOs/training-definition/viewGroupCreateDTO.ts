import {UserBasicDTO} from "../user/user-basic-dto";

export class ViewGroupCreateDTO {
  title: string;
  description: string;
  organizers: UserBasicDTO[];
}
