import { UserRole } from '@sentinel/auth';
import { DynamicEnvironment } from '../../environments/dynamic-environment';

export class RoleResolver {
  static isUserAndGroupAdmin(roles: UserRole[]): boolean {
    return roles.some((role) => role.roleType === DynamicEnvironment.getConfig().roleMapping.uagAdmin);
  }

  static isTrainingDesigner(roles: UserRole[]): boolean {
    return roles.some((role) => role.roleType === DynamicEnvironment.getConfig().roleMapping.trainingDesigner);
  }

  static isTrainingOrganizer(roles: UserRole[]): boolean {
    return roles.some((role) => role.roleType === DynamicEnvironment.getConfig().roleMapping.trainingOrganizer);
  }

  static isTrainingTrainee(roles: UserRole[]): boolean {
    return roles.some((role) => role.roleType === DynamicEnvironment.getConfig().roleMapping.trainingTrainee);
  }

  static isSandboxDesigner(roles: UserRole[]): boolean {
    return roles.some((role) => role.roleType === DynamicEnvironment.getConfig().roleMapping.sandboxDesigner);
  }

  static isSandboxOrganizer(roles: UserRole[]): boolean {
    return roles.some((role) => role.roleType === DynamicEnvironment.getConfig().roleMapping.sandboxOrganizer);
  }
}
