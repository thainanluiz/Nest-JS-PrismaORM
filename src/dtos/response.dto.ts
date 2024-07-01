import { IsString, IsNumber, IsNotEmpty, IsDefined } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseDto {
  @ApiProperty({ description: 'Timestamp of the response' })
  @IsNumber()
  @IsDefined()
  timestamp: number;

  @ApiProperty({ description: 'HTTP status code of the response' })
  @IsNumber()
  @IsDefined()
  status: number;

  @ApiProperty({ description: 'Message describing the response' })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiProperty({ description: 'Data returned in the response' })
  data: any;
}
