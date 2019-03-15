import {environment} from '../../../environments/environment';
import {UserAndGroupManagementConfig} from 'kypo2-user-and-group-management'

export const UserAndGroupConfig: UserAndGroupManagementConfig = {
  userAndGroupRestBasePath: environment.userAndGroupRestBasePath,
  defaultPaginationSize: environment.userAndGroupDefaultPaginationSize
};
