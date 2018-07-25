/**
 * Parent class of all level types. Can't be instantiated
 */
export abstract class AbstractLevel {
  id: number;
  trainingDefinitionId: number;
  title: string;
  maxScore: number = 0;
  order: number;
  preHook: string;
  postHook: string;


  constructor(trainingDefinitionId: number, title: string, maxScore: number, order: number, preHook: string, postHook: string) {
    this.trainingDefinitionId = trainingDefinitionId;
    this.title = title;
    this.maxScore = maxScore;
    this.order = order;
    this.preHook = preHook;
    this.postHook = postHook;
  }
}
