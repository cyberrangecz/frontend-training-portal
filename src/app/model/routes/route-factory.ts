import {TRAINING_DEFINITION_PATH, TRAINING_INSTANCE_PATH} from '../../paths';
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

export class RouteFactory {

  static toTrainingDefinitionOverview(): string {
    return TRAINING_DEFINITION_PATH;
  }

  static toTrainingDefinitionPreview(id): string {
    return `${TRAINING_DEFINITION_PATH}/${id}/${TRAINING_DEFINITION_PREVIEW_PATH}`;
  }

  static toTrainingDefinitionEdit(id): string {
    return `${TRAINING_DEFINITION_PATH}/${id}/${TRAINING_DEFINITION_EDIT_PATH}`;
  }

  static toNewTrainingDefinition(): string {
    return `${TRAINING_DEFINITION_PATH}/${TRAINING_DEFINITION_NEW_PATH}`;
  }

  static toTrainingInstanceOverview(): string {
    return TRAINING_INSTANCE_PATH;
  }

  static toTrainingInstanceEdit(id): string {
    return `${TRAINING_INSTANCE_PATH}/${id}/${TRAINING_INSTANCE_EDIT_PATH}`;
  }

  static toTrainingInstanceAccessToken(id): string {
    return `${TRAINING_INSTANCE_PATH}/${id}/${ACCESS_TOKEN_PATH}`;
  }

  static toTrainingInstanceDetail(id): string {
    return `${TRAINING_INSTANCE_PATH}/${id}/${TRAINING_INSTANCE_DETAIL_PATH}`;
  }

  static toNewTrainingInstance(): string {
    return `${TRAINING_INSTANCE_PATH}/${TRAINING_INSTANCE_NEW_PATH}`;
  }
}
