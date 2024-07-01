import { IsString, IsNumber, IsNotEmpty, IsDefined } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ description: 'Name of the user' })
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  name: string;

  @ApiProperty({ description: 'Email address of the user' })
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  email: string;
}
