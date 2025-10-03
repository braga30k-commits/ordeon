import { IsEnum } from 'class-validator';
import { CaseStage } from '../case-stage.enum';

export class MoveCaseStageDto {
  @IsEnum(CaseStage)
  stage: CaseStage;
}
