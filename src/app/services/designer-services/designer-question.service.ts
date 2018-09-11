import {Injectable} from "@angular/core";
import {AssessmentLevel} from "../../model/level/assessment-level";
import {AbstractQuestion} from "../../model/questions/abstract-question";

@Injectable()
export class DesignerQuestionService {
  level: AssessmentLevel;
  questions: AbstractQuestion[];


}
