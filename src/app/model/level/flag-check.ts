/**
 * Class representing a flag check in game level
 */

export class FlagCheck {
  isCorrect: boolean;
  remainingAttempts: number;
  solution: string;

  hasRemainingAttempts(): boolean {
    return this.remainingAttempts > 0;
  }
}
