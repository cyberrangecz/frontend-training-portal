import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { SentinelAuthGuardWithLogin, SentinelNegativeAuthGuard } from '@sentinel/auth/guards';
import { SANDBOX_DEFINITION_PATH, SANDBOX_IMAGES_PATH, SANDBOX_POOL_PATH } from '@crczp/sandbox-agenda';
import {
    ADAPTIVE_DEFINITION_PATH,
    ADAPTIVE_INSTANCE_PATH,
    MITRE_TECHNIQUES_PATH,
    TRAINING_DEFINITION_PATH,
    TRAINING_INSTANCE_PATH,
    TRAINING_RUN_PATH,
} from '@crczp/training-agenda';
import { GROUP_PATH, MICROSERVICE_PATH, USER_PATH } from '@crczp/user-and-group-agenda';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { HOME_PATH, LOGIN_PATH, NOTIFICATIONS_PATH } from './paths';
import { AdvancedUserGuard } from './services/guards/advanced-user.guard.service';
import { SandboxDesignerGuard } from './services/guards/sandbox-designer-guard.service';
import { SandboxOrganizerGuard } from './services/guards/sandbox-organizer-guard.service';
import { TraineeGuard } from './services/guards/trainee-guard.service';
import { TrainingDesignerGuard } from './services/guards/training-designer-guard.service';
import { TrainingOrganizerGuard } from './services/guards/training-organizer-guard.service';
import { UserAndGroupGuard } from './services/guards/user-and-group-guard.service';
import { RoleBasedPreloader } from './utils/role-based-preloading';
import { RoleResolver } from './utils/role-resolver';
import { AdaptiveTrainingOrganizerGuard } from './services/guards/training-adaptive-organizer-guard.service';
import { AdaptiveTrainingDesignerGuard } from './services/guards/training-adaptive-designer-guard.service';

const routes: Routes = [
    {
        path: HOME_PATH,
        component: HomeComponent,
        canActivate: [AdvancedUserGuard],
    },
    {
        path: TRAINING_DEFINITION_PATH,
        loadChildren: () =>
            import('./modules/training-agenda/definition/overview/training-definition-overview.module').then(
                (m) => m.TrainingDefinitionOverviewModule,
            ),
        canActivate: [TrainingDesignerGuard],
        data: {
            breadcrumb: 'Linear Training Definitions',
            title: 'Linear Training Definition Overview',
            roleResolver: RoleResolver.isTrainingDesigner,
        },
    },
    {
        path: ADAPTIVE_DEFINITION_PATH,
        loadChildren: () =>
            import('./modules/training-agenda/adaptive-definition/overview/adaptive-definition-overview.module').then(
                (m) => m.AdaptiveDefinitionOverviewModule,
            ),
        canActivate: [AdaptiveTrainingDesignerGuard],
        data: {
            breadcrumb: 'Adaptive Training Definitions',
            title: 'Adaptive Training Definition Overview',
            roleResolver: RoleResolver.isAdaptiveTrainingDesigner,
        },
    },
    {
        path: SANDBOX_DEFINITION_PATH,
        loadChildren: () =>
            import('./modules/sandbox-agenda/definition/sandbox-definition-overview.module').then(
                (m) => m.SandboxDefinitionOverviewModule,
            ),
        canActivate: [SandboxDesignerGuard],
        data: {
            breadcrumb: 'Sandbox Definitions',
            title: 'Sandbox Definition Overview',
            roleResolver: RoleResolver.isSandboxDesigner,
        },
    },
    {
        path: TRAINING_INSTANCE_PATH,
        loadChildren: () =>
            import('./modules/training-agenda/instance/overview/training-instance-overview.module').then(
                (m) => m.TrainingInstanceOverviewModule,
            ),
        canActivate: [TrainingOrganizerGuard],
        data: {
            breadcrumb: 'Linear Training Instances',
            title: 'Linear Training Instance Overview',
            roleResolver: RoleResolver.isTrainingOrganizer,
        },
    },
    {
        path: ADAPTIVE_INSTANCE_PATH,
        loadChildren: () =>
            import('./modules/training-agenda/adaptive-instance/overview/adaptive-instance-overview.module').then(
                (m) => m.AdaptiveInstanceOverviewModule,
            ),
        canActivate: [AdaptiveTrainingOrganizerGuard],
        data: {
            breadcrumb: 'Adaptive Training Instances',
            title: 'Adaptive Training Instance Overview',
            roleResolver: RoleResolver.isAdaptiveTrainingOrganizer,
        },
    },
    {
        path: SANDBOX_POOL_PATH,
        loadChildren: () =>
            import('./modules/sandbox-agenda/pool/pool-overview.module').then((m) => m.PoolOverviewModule),
        canActivate: [SandboxOrganizerGuard],
        data: {
            breadcrumb: 'Pools',
            title: 'Pool Overview',
            roleResolver: RoleResolver.isSandboxOrganizer,
        },
    },
    {
        path: SANDBOX_IMAGES_PATH,
        loadChildren: () =>
            import('./modules/sandbox-agenda/images/sandbox-images.module').then((m) => m.SandboxImagesOverviewModule),
        canActivate: [SandboxOrganizerGuard],
        data: {
            breadcrumb: 'Images',
            title: 'Images Overview',
            roleResolver: RoleResolver.isSandboxOrganizer,
        },
    },
    {
        path: TRAINING_RUN_PATH,
        loadChildren: () =>
            import('./modules/training-agenda/run/overview/training-run-overview.module').then(
                (m) => m.TrainingRunOverviewModule,
            ),
        canActivate: [TraineeGuard],
        data: {
            breadcrumb: 'Training Runs',
            title: 'Training Run Overview',
            roleResolver: RoleResolver.isTrainingTrainee,
        },
    },
    {
        path: MITRE_TECHNIQUES_PATH,
        loadChildren: () =>
            import('./modules/training-agenda/mitre-techniques/mitre-techniques.module').then(
                (m) => m.MitreTechniquesModule,
            ),
        canActivate: [TrainingDesignerGuard],
        data: {
            breadcrumb: 'MITRE Techniques',
            title: 'MITRE Techniques',
            roleResolver: RoleResolver.isTrainingDesigner,
            showSwitch: false,
        },
    },
    {
        path: USER_PATH,
        loadChildren: () =>
            import('./modules/user-and-group-agenda/user/user-overview.module').then((m) => m.UserOverviewModule),
        canActivate: [UserAndGroupGuard],
        data: {
            breadcrumb: 'Users',
            title: 'User Overview',
            roleResolver: RoleResolver.isUserAndGroupAdmin,
        },
    },
    {
        path: GROUP_PATH,
        loadChildren: () =>
            import('./modules/user-and-group-agenda/group/group-overview.module').then((m) => m.GroupOverviewModule),
        canActivate: [UserAndGroupGuard],
        data: {
            breadcrumb: 'Groups',
            title: 'Group Overview',
            roleResolver: RoleResolver.isUserAndGroupAdmin,
        },
    },
    {
        path: MICROSERVICE_PATH,
        loadChildren: () =>
            import('./modules/user-and-group-agenda/microservice/microservice-overview.module').then(
                (m) => m.MicroserviceOverviewModule,
            ),
        canActivate: [UserAndGroupGuard],
        data: {
            breadcrumb: 'Microservice',
            title: 'Microservice Overview',
            roleResolver: RoleResolver.isUserAndGroupAdmin,
        },
    },
    {
        path: LOGIN_PATH,
        component: LoginComponent,
        canActivate: [SentinelNegativeAuthGuard],
    },
    {
        path: NOTIFICATIONS_PATH,
        canActivate: [SentinelAuthGuardWithLogin],
        loadChildren: () =>
            import('./modules/notifications/notifications-overview.module').then((m) => m.NotificationsOverviewModule),
        data: { breadcrumb: 'Notifications', title: 'Notifications' },
    },
    {
        path: '',
        redirectTo: HOME_PATH,
        pathMatch: 'full',
    },
    {
        path: 'logout-confirmed',
        redirectTo: HOME_PATH,
        pathMatch: 'full',
    },
    {
        path: 'mitre-techniques',
        loadChildren: () =>
            import('./modules/training-agenda/mitre-techniques/mitre-techniques.module').then(
                (m) => m.MitreTechniquesModule,
            ),
        data: {
            title: 'MITRE ATT&CK Techniques',
            breadcrumb: 'MITRE ATT&CK Techniques',
            showSwitch: false,
        },
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            initialNavigation: 'enabledNonBlocking',
            preloadingStrategy: RoleBasedPreloader,
            paramsInheritanceStrategy: 'always',
        } as ExtraOptions),
    ],
    exports: [RouterModule],
})
/**
 * Main routing module. Contains routes to all lazy-loaded app agendas.
 */
export class AppRoutingModule {}
