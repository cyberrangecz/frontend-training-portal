import { User } from '@sentinel/auth';
import { NavAgendaContainerConfig } from '@crczp/theme';
import {
    COOP_DEFINITION_PATH,
    COOP_INSTANCE_PATH,
    LINEAR_DEFINITION_PATH,
    LINEAR_INSTANCE_PATH,
    RUN_PATH,
} from '@crczp/training-agenda';
import { RoleResolver } from './role-resolver';
import { SANDBOX_DEFINITION_PATH, SANDBOX_IMAGES_PATH, SANDBOX_POOL_PATH } from '@crczp/sandbox-agenda';
import { GROUP_PATH, MICROSERVICE_PATH, USER_PATH } from '@crczp/user-and-group-agenda';

export class NavConfigFactory {
    static buildNavConfig(user: User): NavAgendaContainerConfig[] {
        return [
            {
                label: 'Trainings',
                agendas: [
                    {
                        label: 'Definition',
                        agendas: [
                            {
                                label: 'Linear',
                                path: LINEAR_DEFINITION_PATH,
                                canActivate: () => RoleResolver.isTrainingDesigner(user.roles),
                            },
                            {
                                label: 'Coop',
                                path: COOP_DEFINITION_PATH,
                                canActivate: () => RoleResolver.isTrainingDesigner(user.roles),
                            },
                        ],
                    },
                    {
                        label: 'Instance',
                        agendas: [
                            {
                                label: 'Linear',
                                path: LINEAR_INSTANCE_PATH,
                                canActivate: () => RoleResolver.isTrainingOrganizer(user.roles),
                            },
                            {
                                label: 'Coop',
                                path: COOP_INSTANCE_PATH,
                                canActivate: () => RoleResolver.isTrainingOrganizer(user.roles),
                            },
                        ],
                    },
                    {
                        label: 'Run',
                        path: RUN_PATH,
                    },
                ],
            },
            {
                label: 'Sandboxes',
                agendas: [
                    {
                        label: 'Definition',
                        path: SANDBOX_DEFINITION_PATH,
                        canActivate: () => RoleResolver.isAdaptiveTrainingDesigner(user.roles),
                    },
                    {
                        label: 'Pool',
                        path: SANDBOX_POOL_PATH,
                        canActivate: () => RoleResolver.isSandboxOrganizer(user.roles),
                    },
                    {
                        label: 'Images',
                        path: SANDBOX_IMAGES_PATH,
                        canActivate: () => RoleResolver.isSandboxOrganizer(user.roles),
                    },
                ],
            },
            {
                label: 'Administration',
                agendas: [
                    {
                        label: 'User',
                        path: USER_PATH,
                        canActivate: () => RoleResolver.isUserAndGroupAdmin(user.roles),
                    },
                    {
                        label: 'Group',
                        path: GROUP_PATH,
                        canActivate: () => RoleResolver.isUserAndGroupAdmin(user.roles),
                    },
                    {
                        label: 'Microservice',
                        path: MICROSERVICE_PATH,
                        canActivate: () => RoleResolver.isUserAndGroupAdmin(user.roles),
                    },
                ],
            },
        ];
    }
}
