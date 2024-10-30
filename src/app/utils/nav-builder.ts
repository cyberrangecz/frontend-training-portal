import { User } from '@sentinel/auth';
import { Agenda, AgendaContainer } from '@sentinel/layout';
import { SANDBOX_DEFINITION_PATH, SANDBOX_POOL_PATH, SANDBOX_IMAGES_PATH } from '@muni-kypo-crp/sandbox-agenda';
import {
  ADAPTIVE_DEFINITION_PATH,
  ADAPTIVE_INSTANCE_PATH,
  TRAINING_DEFINITION_PATH,
  TRAINING_INSTANCE_PATH,
  TRAINING_RUN_PATH,
} from '@muni-kypo-crp/training-agenda';
import { GROUP_PATH, MICROSERVICE_PATH, USER_PATH } from '@muni-kypo-crp/user-and-group-agenda';
import { RoleResolver } from './role-resolver';

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
    const agendas = [];
    if (RoleResolver.isTrainingDesigner(user.roles)) {
      agendas.push(
        new AgendaContainer('Definition', [
          new Agenda('Adaptive', ADAPTIVE_DEFINITION_PATH),
          new Agenda('Linear', TRAINING_DEFINITION_PATH),
        ]),
      );
    }
    if (RoleResolver.isTrainingOrganizer(user.roles)) {
      agendas.push(
        new AgendaContainer('Instance', [
          new Agenda('Adaptive', ADAPTIVE_INSTANCE_PATH),
          new Agenda('Linear', TRAINING_INSTANCE_PATH),
        ]),
      );
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
    if (RoleResolver.isSandboxOrganizer(user.roles)) {
      agendas.push(new Agenda('Images', SANDBOX_IMAGES_PATH));
    }
    return agendas;
  }

  private static createAdminAgendas(user: User): Agenda[] {
    const agendas: Agenda[] = [];
    if (RoleResolver.isUserAndGroupAdmin(user.roles)) {
      agendas.push(new Agenda('User', USER_PATH));
      agendas.push(new Agenda('Group', GROUP_PATH));
      agendas.push(new Agenda('Microservice', MICROSERVICE_PATH));
    }
    return agendas;
  }
}
