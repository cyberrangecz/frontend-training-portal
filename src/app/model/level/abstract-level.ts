
export abstract class AbstractLevel {
  id: number;
  trainingDefinitionId: number;
  title: string;
  maxScore: number = 0;
  order: number;
  preHook: Blob;
  postHook: Blob;


  constructor(trainingDefinitionId: number, title: string, maxScore: number, order: number, preHook: Blob, postHook: Blob) {
    this.trainingDefinitionId = trainingDefinitionId;
    this.title = title;
    this.maxScore = maxScore;
    this.order = order;
    this.preHook = preHook;
    this.postHook = postHook;
  }
}
