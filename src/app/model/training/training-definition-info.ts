import {TrainingDefinitionStateEnum} from "../enums/training-definition-state.enum";

export class TrainingDefinitionInfo {
  id: number;
  title: string;
  state: TrainingDefinitionStateEnum;
}
