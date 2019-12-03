import {
  TRAINING_DEFINITION_EDIT_PATH,
  TRAINING_DEFINITION_NEW_PATH, TRAINING_DEFINITION_PREVIEW_PATH
} from '../../components/training-definition/training-definition-overview/paths';
import {
  ACCESS_TOKEN_PATH,
  TRAINING_INSTANCE_DETAIL_PATH,
  TRAINING_INSTANCE_EDIT_PATH,
  TRAINING_INSTANCE_NEW_PATH
} from '../../components/training-instance/training-instance-overview/paths';
import {
  POOL_CLEANUP_REQUEST_PATH,
  POOL_CREATION_REQUEST_PATH,
  SANDBOX_INSTANCE_PATH,
  SANDBOX_INSTANCE_TOPOLOGY_PATH
} from '../../components/sandbox-instance/sandbox-pool-detail/paths';
import {SANDBOX_INSTANCE_RESOURCE_PATH} from '../../components/sandbox-instance/sandbox-instance-resource-detail/paths';
import {SANDBOX_POOL_PATH, TRAINING_DEFINITION_PATH, TRAINING_INSTANCE_PATH, TRAINING_RUN_PATH} from '../../paths';
import {TRAINING_RUN_GAME_PATH, TRAINING_RUN_RESULTS_PATH} from '../../components/training-run/training-run-overview/paths';
import {Kypo2UserAndGroupRouteEvent} from 'kypo2-user-and-group-management';

export class RouteFactory {

  static toTrainingDefinitionOverview(): string {
    return TRAINING_DEFINITION_PATH;
  }

  static toTrainingDefinitionPreview(id: number | string): string {
    return `${TRAINING_DEFINITION_PATH}/${id}/${TRAINING_DEFINITION_PREVIEW_PATH}`;
  }

  static toTrainingDefinitionEdit(id: number | string): string {
    return `${TRAINING_DEFINITION_PATH}/${id}/${TRAINING_DEFINITION_EDIT_PATH}`;
  }

  static toNewTrainingDefinition(): string {
    return `${TRAINING_DEFINITION_PATH}/${TRAINING_DEFINITION_NEW_PATH}`;
  }

  static toTrainingInstanceOverview(): string {
    return TRAINING_INSTANCE_PATH;
  }

  static toTrainingInstanceEdit(id: number | string): string {
    return `${TRAINING_INSTANCE_PATH}/${id}/${TRAINING_INSTANCE_EDIT_PATH}`;
  }

  static toTrainingInstanceAccessToken(id: number | string): string {
    return `${TRAINING_INSTANCE_PATH}/${id}/${ACCESS_TOKEN_PATH}`;
  }

  static toTrainingInstanceDetail(id: number | string): string {
    return `${TRAINING_INSTANCE_PATH}/${id}/${TRAINING_INSTANCE_DETAIL_PATH}`;
  }

  static toNewTrainingInstance(): string {
    return `${TRAINING_INSTANCE_PATH}/${TRAINING_INSTANCE_NEW_PATH}`;
  }

  static toTrainingRunGame(id: number | string): string {
    return `${TRAINING_RUN_PATH}/${id}/${TRAINING_RUN_GAME_PATH}`;
  }

  static toTrainingRunResult(id: number | string): string {
    return `${TRAINING_RUN_PATH}/${id}/${TRAINING_RUN_RESULTS_PATH}`;
  }

  static toPool(id: number | string): string {
    return `${SANDBOX_POOL_PATH}/${id}`;
  }

  static toPoolOverview(): string {
    return SANDBOX_POOL_PATH;
  }

  static toSandboxInstance(poolId: number | string, sandboxId: number | string): string {
    return `${SANDBOX_POOL_PATH}/${poolId}/${SANDBOX_INSTANCE_PATH}/${sandboxId}`;
  }

  static toSandboxInstanceTopology(poolId: number | string, sandboxId: number | string): string {
    return `${SANDBOX_POOL_PATH}/${poolId}/${SANDBOX_INSTANCE_PATH}/${sandboxId}/${SANDBOX_INSTANCE_TOPOLOGY_PATH}`;
  }

  static toSandboxInstanceResource(poolId: number | string, sandboxId: number | string, resourceName: number | string): string {
    return `${SANDBOX_POOL_PATH}/${poolId}/${SANDBOX_INSTANCE_PATH}/${sandboxId}/${SANDBOX_INSTANCE_RESOURCE_PATH}/${resourceName}`;
  }

  static toCreationRequest(poolId: number | string, requestId: number | string): string {
    return `${SANDBOX_POOL_PATH}/${poolId}/${POOL_CREATION_REQUEST_PATH}/${requestId}`;
  }

  static toCleanupRequest(poolId: number | string, requestId: number | string): string {
    return `${SANDBOX_POOL_PATH}/${poolId}/${POOL_CLEANUP_REQUEST_PATH}/${requestId}`;
  }

  static parseUserAndGroupRouteEvent(routeEvent: Kypo2UserAndGroupRouteEvent): string {
    let route = `${routeEvent.resourceType.toLowerCase()}/`;
    if (routeEvent.resourceId !== undefined && routeEvent.resourceId !== null) {
      route += `${routeEvent.resourceId}/`;
    }
    if (routeEvent.actionType) {
      route += RouteFactory.parseUserAndGroupActionType(routeEvent.actionType);
    }
    return route;
  }

  private static parseUserAndGroupActionType(actionType: 'EDIT' | 'NEW' | 'DETAIL') {
    if (actionType === 'EDIT') {
      return 'edit/';
    }
    if (actionType === 'NEW') {
      return 'add/';
    }
    if (actionType === 'DETAIL') {
      console.error('USER AND GROUP ActionType of "DETAIL" not supported!');
      return '';
    }
  }
}
