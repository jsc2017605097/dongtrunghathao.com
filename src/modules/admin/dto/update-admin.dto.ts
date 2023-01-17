import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateAdminDto } from './create-admin.dto';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateAdminDto extends PartialType(CreateAdminDto) {
  @ApiProperty({ required: false })
  @IsOptional()
  privateKey: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  newPassword: string;
}
