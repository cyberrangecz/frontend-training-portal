import {UserAndGroupManagementConfig} from 'kypo2-user-and-group-management'
import {environment} from "../../environments/environment";

export const UserAndGroupConfig: UserAndGroupManagementConfig = {
  userAndGroupRestBasePath: environment.userAndGroupRestBasePath,
  defaultPaginationSize: environment.userAndGroupDefaultPaginationSize
};
