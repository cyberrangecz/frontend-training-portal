import {TrainingDefinition} from "../training/training-definition";

export abstract class number {
  id: number;
  trainingDefinition: TrainingDefinition;
  title: string;
  maxScore: number = 0;
  order: number;
  preHook: Blob;
  postHook: Blob;


  constructor(id: number, trainingDefinition: TrainingDefinition, title: string, maxScore: number, order: number, preHook: Blob, postHook: Blob) {
    this.id = id;
    this.trainingDefinition = trainingDefinition;
    this.title = title;
    this.maxScore = maxScore;
    this.order = order;
    this.preHook = preHook;
    this.postHook = postHook;
  }
}
