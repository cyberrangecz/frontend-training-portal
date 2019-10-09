
export interface AbstractLevelDTO {
    id?: number;
    max_score?: number;
    estimated_duration: number;
    order: number;
    snapshot_hook?: any;
    title?: string;
    level_type: AbstractLevelDTO.LevelTypeEnum;
}

export namespace AbstractLevelDTO {
  export type LevelTypeEnum = 'INFO_LEVEL' | 'ASSESSMENT_LEVEL' | 'GAME_LEVEL';
  export const LevelTypeEnum = {
    INFO: 'INFO_LEVEL' as LevelTypeEnum,
    ASSESSMENT: 'ASSESSMENT_LEVEL' as LevelTypeEnum,
    GAME: 'GAME_LEVEL' as LevelTypeEnum
  };
}
