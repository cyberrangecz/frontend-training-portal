import {UserInfoDTO} from "../user/user-info-dto";

export class ViewGroupCreateDTO {
  title: string;
  description: string;
  organizers: UserInfoDTO[];
}
