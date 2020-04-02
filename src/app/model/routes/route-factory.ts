import {
  TRAINING_DEFINITION_EDIT_PATH,
  TRAINING_DEFINITION_NEW_PATH,
  TRAINING_DEFINITION_PREVIEW_PATH
} from '../../components/training-definition/training-definition-overview/paths';
import {
  TRAINING_INSTANCE_DETAIL_PATH,
  TRAINING_INSTANCE_EDIT_PATH,
  TRAINING_INSTANCE_NEW_PATH
} from '../../components/training-instance/training-instance-overview/paths';
import {
  TRAINING_DEFINITION_PATH,
  TRAINING_INSTANCE_PATH,
  TRAINING_RUN_PATH
} from '../../paths';
import {
  TRAINING_RUN_ACCESS_PATH,
  TRAINING_RUN_RESULTS_PATH, TRAINING_RUN_RESUME_PATH
} from '../../components/training-run/training-run-overview/paths';
import {Kypo2UserAndGroupRouteEvent} from 'kypo2-user-and-group-management';
import {
  ACCESS_TOKEN_PATH,
  PROGRESS_PATH,
  RESULTS_PATH,
  SUMMARY_PATH
} from '../../components/training-instance/training-instance-detail/paths';

/**
 * Class containing all possible routes in the system. Use absolute routing
 */
export class RouteFactory {

  /**
   * Returns route to training definition overview page
   */
  static toTrainingDefinitionOverview(): string {
    return TRAINING_DEFINITION_PATH;
  }

  /**
   * Returns route to training definition preview page
   * @param id id of the training definition
   */
  static toTrainingDefinitionPreview(id: number | string): string {
    return `${TRAINING_DEFINITION_PATH}/${id}/${TRAINING_DEFINITION_PREVIEW_PATH}`;
  }

  /**
   * Returns route to training definition edit page
   * @param id id of the training definition
   */
  static toTrainingDefinitionEdit(id: number | string): string {
    return `${TRAINING_DEFINITION_PATH}/${id}/${TRAINING_DEFINITION_EDIT_PATH}`;
  }
  /**
   * Returns route to new training definition page
   */
  static toNewTrainingDefinition(): string {
    return `${TRAINING_DEFINITION_PATH}/${TRAINING_DEFINITION_NEW_PATH}`;
  }

  /**
   * Returns route to training instance overview page
   */
  static toTrainingInstanceOverview(): string {
    return TRAINING_INSTANCE_PATH;
  }

  /**
   * Returns route to training instance edit page
   * @param id id of the training instance
   */
  static toTrainingInstanceEdit(id: number | string): string {
    return `${TRAINING_INSTANCE_PATH}/${id}/${TRAINING_INSTANCE_EDIT_PATH}`;
  }

  /**
   * Returns route to training instance detail page
   * @param id id of the training instance
   */
  static toTrainingInstanceDetail(id: number | string): string {
    return `${TRAINING_INSTANCE_PATH}/${id}/${TRAINING_INSTANCE_DETAIL_PATH}`;
  }

  /**
   * Returns route to training instance access token page
   * @param id id of the training instance
   */
  static toTrainingInstanceAccessToken(id: number | string): string {
    return `${this.toTrainingInstanceDetail(id)}/${ACCESS_TOKEN_PATH}`;
  }

  /**
   * Returns route to training instance summary page
   * @param id id of the training instance
   */
  static toTrainingInstanceSummary(id: number | string): string {
    return `${this.toTrainingInstanceDetail(id)}/${SUMMARY_PATH}`;
  }

  /**
   * Returns route to training instance progress page
   * @param id id of the training instance
   */
  static toTrainingInstanceProgress(id: number | string): string {
    return `${this.toTrainingInstanceDetail(id)}/${PROGRESS_PATH}`;
  }

  /**
   * Returns route to training instance results page
   * @param id id of the training instance
   */
  static toTrainingInstanceResults(id: number | string): string {
    return `${this.toTrainingInstanceDetail(id)}/${RESULTS_PATH}`;
  }

  /**
   * Returns route to new training instance page
   */
  static toNewTrainingInstance(): string {
    return `${TRAINING_INSTANCE_PATH}/${TRAINING_INSTANCE_NEW_PATH}`;
  }

  static toTrainingRunOverview(): string {
    return TRAINING_RUN_PATH;
  }

  /**
   * Returns route to training run game page
   * @param id id of the training run
   */
  static toResumeTrainingRunGame(id: number | string): string {
    return `${TRAINING_RUN_PATH}/${TRAINING_RUN_RESUME_PATH}/${id}`;
  }

  static toAccessTrainingRunGame(token: string): string {
    return `${TRAINING_RUN_PATH}/${TRAINING_RUN_ACCESS_PATH}/${token}`;
  }

  /**
   * Returns route to training run results page
   * @param id id of the training run
   */
  static toTrainingRunResult(id: number | string): string {
    return `${TRAINING_RUN_PATH}/${TRAINING_RUN_RESULTS_PATH}/${id}`;
  }

  /**
   * Transforms user and group library events to app routes
   * @param routeEvent event emitted from the library
   */
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
      return 'create/';
    }
    if (actionType === 'DETAIL') {
      console.error('USER AND GROUP ActionType of "DETAIL" not supported!');
      return '';
    }
  }
}
