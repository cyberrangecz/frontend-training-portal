import {IsCorrectFlagDTO} from '../../DTOs/level/game/is-correct-flag-dto';
import {FlagCheck} from '../../level/flag-check';

export class FlagMapper {

  static fromDTO(dto: IsCorrectFlagDTO): FlagCheck {
    const result = new FlagCheck();
    result.isCorrect = dto.correct;
    result.remainingAttempts = dto.remaining_attempts;
    result.solution = dto.solution;
    return result;
  }
}
