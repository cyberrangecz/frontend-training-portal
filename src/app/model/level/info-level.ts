import {AbstractLevel} from "./abstract-level";
import {TrainingDefinition} from "../training/training-definition";

export class InfoLevel extends AbstractLevel {
  content: Blob; // HTML -> use string?


  constructor(id: number, trainingDefinitionId: number, title: string, maxScore: number, order: number, preHook: Blob, postHook: Blob, content: Blob) {
    super(id, trainingDefinitionId, title, maxScore, order, preHook, postHook);
    this.content = content;
  }
}
