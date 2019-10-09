import {AssessmentTypeEnum} from '../enums/assessment-type.enum';
import {AbstractQuestion} from '../questions/abstract-question';
import {AbstractLevel} from './abstract-level';

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
