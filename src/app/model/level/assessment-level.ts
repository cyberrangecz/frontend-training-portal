import {AssessmentTypeEnum} from '../enums/assessment-type.enum';
import {AbstractLevel} from './abstract-level';
import {AbstractQuestion} from '../questions/abstract-question';

/**
 * Class representing level in a game of type Assessment
 */
export class AssessmentLevel extends AbstractLevel {
  questions: AbstractQuestion[];
  instructions: string;
  assessmentType: AssessmentTypeEnum;

  constructor() {
    super();
    this.questions = [];
    this.icon = 'assignment';
  }
}
