import { UserRole } from 'kypo2-auth';

export class RoleResolver {
  static isUserAndGroupAdmin(roles: UserRole[]): boolean {
    return roles.some((role) => role.roleType === 'ROLE_USER_AND_GROUP_ADMINISTRATOR');
  }

  static isTrainingDesigner(roles: UserRole[]): boolean {
    return roles.some((role) => role.roleType === 'ROLE_TRAINING_DESIGNER');
  }

  static isTrainingOrganizer(roles: UserRole[]): boolean {
    return roles.some((role) => role.roleType === 'ROLE_TRAINING_ORGANIZER');
  }

  static isTrainingTrainee(roles: UserRole[]): boolean {
    return roles.some((role) => role.roleType === 'ROLE_TRAINING_TRAINEE');
  }

  static isSandboxDesigner(roles: UserRole[]): boolean {
    return roles.some((role) => role.roleType === 'ROLE_KYPO.SANDBOX_SERVICE_PROJECT_DESIGNER');
  }

  static isSandboxOrganizer(roles: UserRole[]): boolean {
    return roles.some((role) => role.roleType === 'ROLE_KYPO.SANDBOX_SERVICE_PROJECT_ORGANIZER');
  }
}
