import { IsString, IsNotEmpty, MinLength, IsIn, IsOptional, IsEmail } from 'class-validator';

export class CreateClientDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name: string;

  @IsString()
  @IsIn(['PF', 'PJ'])
  type: 'PF' | 'PJ';

  @IsOptional()
  @IsString()
  cpfCnpj?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;
}
