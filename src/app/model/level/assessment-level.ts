import {AssessmentTypeEnum} from '../enums/assessment-type.enum';
import {Question} from '../questions/question';
import {Level} from './level';

/**
 * Class representing level in a game of type Assessment
 */
export class AssessmentLevel extends Level {
  questions: Question[];
  instructions: string;
  assessmentType: AssessmentTypeEnum;

  constructor() {
    super();
    this.questions = [];
  }
}
