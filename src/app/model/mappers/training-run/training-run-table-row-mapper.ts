import {TrainingRunDTO} from '../../DTOs/training-run/training-run-dto';
import {TrainingRunTableRow} from '../../table/row/training-run-table-row';
import {TrainingRunMapper} from './training-run-mapper';

export class TrainingRunTableRowMapper {

  static fromDTO(dto: TrainingRunDTO): TrainingRunTableRow {
    const result = new TrainingRunTableRow();
    result.trainingRun = TrainingRunMapper.fromDTO(dto);
    return result;
  }

  static fromDTOs(dtos: TrainingRunDTO[]): TrainingRunTableRow[] {
    return dtos.map(dto => TrainingRunTableRowMapper.fromDTO(dto));
  }
}
