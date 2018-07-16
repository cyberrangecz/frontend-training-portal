import {number} from "./abstract-level";
import {TrainingDefinition} from "../training/training-definition";

export class InfoLevel extends number {
  content: Blob; // HTML -> use string?


  constructor(id: number, trainingDefinition: TrainingDefinition, title: string, maxScore: number, order: number, preHook: Blob, postHook: Blob, content: Blob) {
    super(id, trainingDefinition, title, maxScore, order, preHook, postHook);
    this.content = content;
  }
}
