/**
 * Class representing hint dialog data in a training level.
 */
export class HintDialogData {
  title: string;
  penalty: number;

  constructor(title: string, penalty: number) {
    this.title = title;
    this.penalty = penalty;
  }
}
