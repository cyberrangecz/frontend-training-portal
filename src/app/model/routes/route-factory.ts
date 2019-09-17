import {TRAINING_DEFINITION_PATH} from '../../paths';
import {TRAINING_DEFINITION_EDIT_PATH} from '../../components/training-definition/training-definition-overview/paths';

export class RouteFactory {

  static toTrainingDefinitionOverview(): string {
    return TRAINING_DEFINITION_PATH;
  }

  static toTrainingDefinitionEdit(id): string {
    return `${TRAINING_DEFINITION_PATH}/${id}/${TRAINING_DEFINITION_EDIT_PATH}`;
  }
}
