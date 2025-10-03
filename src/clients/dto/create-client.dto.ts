import { IsString, IsNotEmpty, MinLength, IsIn, IsOptional, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClientDto {
  @ApiProperty({ description: 'Workspace ID', example: 'a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6' })
  @IsString()
  @IsNotEmpty()
  workspaceId: string;

  @ApiProperty({ description: 'Client name', example: 'John Doe' })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name: string;

  @ApiProperty({ description: 'Client type', example: 'PF' })
  @IsString()
  @IsIn(['PF', 'PJ'])
  type: 'PF' | 'PJ';

  @ApiProperty({ description: 'Client CPF/CNPJ', example: '123.456.789-09', required: false })
  @IsOptional()
  @IsString()
  cpfCnpj?: string;

  @ApiProperty({ description: 'Client email', example: 'john.doe@example.com', required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ description: 'Client phone', example: '(11) 91234-5678', required: false })
  @IsOptional()
  @IsString()
  phone?: string;
}
