import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class BlogListDTO {
  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false })
  @Type(() => Number)
  limit: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  offset: number;

  @ApiProperty({ required: false })
  @IsOptional()
  categoryId: string;

  @ApiProperty({ required: false })
  @IsOptional()
  keyword: string;
}
