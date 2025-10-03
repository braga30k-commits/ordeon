import { IsUUID, IsOptional, IsString, IsEnum, IsInt, Min } from 'class-validator';
import { CaseStage } from '../case-stage.enum';

export class CreateCaseDto {
  @IsUUID()
  clientId: string;

  @IsOptional()
  @IsString()
  number?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  valueCents?: number;

  @IsOptional()
  @IsEnum(CaseStage)
  stage?: CaseStage;
}
