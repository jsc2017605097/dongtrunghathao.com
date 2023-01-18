import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUrl } from 'class-validator';

export class CreateBlogDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  title: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  content: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsUrl()
  blogPhotoUrl: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  categoryId: string;
}
