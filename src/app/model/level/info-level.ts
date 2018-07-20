import {AbstractLevel} from "./abstract-level";

/**
 * Class representing single level in a training of type Info
 */
export class InfoLevel extends AbstractLevel {
  content: Blob; // HTML -> use string?


  constructor(trainingDefinitionId: number, title: string, maxScore: number, order: number, preHook: Blob, postHook: Blob, content: Blob) {
    super(trainingDefinitionId, title, maxScore, order, preHook, postHook);
    this.content = content;
  }
}
