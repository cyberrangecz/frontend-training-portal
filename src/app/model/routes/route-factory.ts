import {POOL_REQUEST_PATH, SANDBOX_INSTANCE_PATH} from '../../components/sandbox-instance/sandbox-pool-detail/paths';
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
import {SANDBOX_POOL_PATH, TRAINING_DEFINITION_PATH, TRAINING_INSTANCE_PATH} from '../../paths';

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

  static toPool(id: number | string): string {
    return `${SANDBOX_POOL_PATH}/${id}`;
  }

  static toPoolOverview(): string {
    return SANDBOX_POOL_PATH;
  }

  static toSandboxInstance(poolId: number | string, sandboxId: number | string): string {
    return `${SANDBOX_POOL_PATH}/${poolId}/${SANDBOX_INSTANCE_PATH}/${sandboxId}`;
  }

  static toPoolRequest(poolId: number | string, requestId: number | string): string {
    return `${SANDBOX_POOL_PATH}/${poolId}/${POOL_REQUEST_PATH}/${requestId}`;
  }
}
