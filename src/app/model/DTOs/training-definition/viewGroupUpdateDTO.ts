import {UserInfoDTO} from "../user/user-info-dto";

export class ViewGroupUpdateDTO {
  id: number;
  title: string;
  description: string;
  organizers: UserInfoDTO[];
}
