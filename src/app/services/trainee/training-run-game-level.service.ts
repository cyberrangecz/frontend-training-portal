import {Injectable} from "@angular/core";
import {TrainingRunFacade} from "../facades/training-run-facade.service";
import {Observable} from "rxjs";
import {FlagCheck} from "../../model/level/flag-check";
import {Hint} from "../../model/level/hint";

@Injectable()
export class TrainingRunGameLevelService {

  constructor(private trainingRunFacade: TrainingRunFacade) {

  }

  isCorrectFlag(trainingRunId: number, flag: string): Observable<FlagCheck>  {
    return this.trainingRunFacade.isCorrectFlag(trainingRunId, flag);
  }

  takeSolution(trainingRunId: number): Observable<string> {
    return this.trainingRunFacade.takeSolution(trainingRunId);
  }

  takeHint(trainingRunId: number, hintId: number): Observable<Hint> {
    return this.trainingRunFacade.takeHint(trainingRunId, hintId);
  }
}
