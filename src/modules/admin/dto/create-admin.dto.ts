import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ required: false })
  @IsOptional()
  nickname: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  privateKey: string;
}
