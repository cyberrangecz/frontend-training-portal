import {User, UserRole} from 'kypo2-auth';
import {
  ADMIN_GROUP_PATH,
  ADMIN_MICROSERVICE_PATH,
  ADMIN_USER_PATH,
  SANDBOX_DEFINITION_PATH,
  SANDBOX_POOL_PATH,
  TRAINING_DEFINITION_PATH,
  TRAINING_INSTANCE_PATH,
  TRAINING_RUN_PATH
} from '../../paths';
import {Agenda, AgendaContainer} from 'csirt-mu-layout';
import {RoleResolver} from './role-resolver';

export class NavBuilder {

  static build(user: User): AgendaContainer[] {
    const containers: AgendaContainer[] = [];
    const trainingAgendas = this.createTrainingAgendas(user);
    const sandboxAgendas = this.createSandboxAgendas(user);
    const adminAgendas = this.createAdminAgendas(user);

    if (trainingAgendas.length > 0) {
      containers.push(new AgendaContainer('Trainings', trainingAgendas));
    }
    if (sandboxAgendas.length > 0) {
      containers.push(new AgendaContainer('Sandboxes', sandboxAgendas));
    }
    if (adminAgendas.length > 0) {
      containers.push(new AgendaContainer('Administration', adminAgendas));
    }
    return containers;
  }

  private static createTrainingAgendas(user: User): Agenda[] {
    const agendas: Agenda[] = [];
    if (RoleResolver.isTrainingDesigner(user.roles)) {
      agendas.push(new Agenda('Definition', TRAINING_DEFINITION_PATH));
    }
    if (RoleResolver.isTrainingOrganizer(user.roles)) {
      agendas.push(new Agenda('Instance', TRAINING_INSTANCE_PATH));
    }
    if (RoleResolver.isTrainingTrainee(user.roles)) {
      agendas.push(new Agenda('Run', TRAINING_RUN_PATH));
    }
    return agendas;
  }

  private static createSandboxAgendas(user: User): Agenda[] {
    const agendas: Agenda[] = [];
    if (RoleResolver.isSandboxDesigner(user.roles)) {
      agendas.push(new Agenda('Definition', SANDBOX_DEFINITION_PATH));
    }
    if (RoleResolver.isSandboxOrganizer(user.roles)) {
      agendas.push(new Agenda('Pool', SANDBOX_POOL_PATH));
    }
    return agendas;
  }

  private static createAdminAgendas(user: User): Agenda[] {
    const agendas: Agenda[] = [];
    if (RoleResolver.isUserAndGroupAdmin(user.roles)) {
      agendas.push(new Agenda('User', ADMIN_USER_PATH));
      agendas.push(new Agenda('Group', ADMIN_GROUP_PATH));
      agendas.push(new Agenda('Microservice', ADMIN_MICROSERVICE_PATH));
    }
    return agendas;
  }
}
