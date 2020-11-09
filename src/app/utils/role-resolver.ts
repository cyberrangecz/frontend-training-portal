import { UserRole } from '@sentinel/auth';
import { KypoDynamicEnvironment } from '../../environments/kypo-dynamic-environment';

export class RoleResolver {
  static isUserAndGroupAdmin(roles: UserRole[]): boolean {
    return roles.some((role) => role.roleType === KypoDynamicEnvironment.getConfig().roleMapping.uagAdmin);
  }

  static isTrainingDesigner(roles: UserRole[]): boolean {
    return roles.some((role) => role.roleType === KypoDynamicEnvironment.getConfig().roleMapping.trainingDesigner);
  }

  static isTrainingOrganizer(roles: UserRole[]): boolean {
    return roles.some((role) => role.roleType === KypoDynamicEnvironment.getConfig().roleMapping.trainingOrganizer);
  }

  static isTrainingTrainee(roles: UserRole[]): boolean {
    return roles.some((role) => role.roleType === KypoDynamicEnvironment.getConfig().roleMapping.trainingTrainee);
  }

  static isSandboxDesigner(roles: UserRole[]): boolean {
    return roles.some((role) => role.roleType === KypoDynamicEnvironment.getConfig().roleMapping.sandboxDesigner);
  }

  static isSandboxOrganizer(roles: UserRole[]): boolean {
    return roles.some((role) => role.roleType === KypoDynamicEnvironment.getConfig().roleMapping.sandboxOrganizer);
  }
}
