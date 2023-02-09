import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsUrl } from 'class-validator';

export enum VIEWER {
  CLIENT = 'client',
}

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

export class GetDetailBlog {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsEnum(VIEWER)
  viewer: string;
}
