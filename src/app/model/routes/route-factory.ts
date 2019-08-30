import {TRAINING_DEFINITION_PATH} from '../../paths';
import {
  LEVELS_PATH,
  TRAINING_DEFINITION_EDIT_PATH
} from '../../components/training-definition/training-definition-overview/paths';

export class RouteFactory {
  static levelDetail(tdId: number, levelId: number): string {
    return `/${TRAINING_DEFINITION_PATH}/${tdId}/${TRAINING_DEFINITION_EDIT_PATH}/${LEVELS_PATH}/${levelId}`;
  }
}
