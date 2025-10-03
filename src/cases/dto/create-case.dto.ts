import { IsUUID, IsOptional, IsString, IsEnum, IsInt, Min } from 'class-validator';
import { CaseStage } from '../case-stage.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCaseDto {
  @ApiProperty({ description: 'Client ID', example: 'a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6' })  
  @IsUUID()
  clientId: string;

  @ApiProperty({ description: 'Case number', example: 'CASE-001', required: false })
  @IsOptional()
  @IsString()
  number?: string;

  @ApiProperty({ description: 'Case description', example: 'Description of the case', required: false })
  @IsOptional()
  @IsInt()
  @Min(0)
  valueCents?: number;

  @ApiProperty({ description: 'Case stage', example: 'PRE_CONTRATO', required: false, enum: CaseStage })
  @IsOptional()
  @IsEnum(CaseStage)
  stage?: CaseStage;
}
