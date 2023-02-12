import {
    ApiProperty
}
from '@nestjs/swagger';
import {
    Transform, Type
}
from 'class-transformer';
import {
    IsBoolean, IsNumber, IsOptional
}
from 'class-validator';

export class BlogListDTO {
    @IsNumber() @IsOptional() @ApiProperty({ required: false }) @Type(() => Number) limit: number;

    @ApiProperty({ required: false }) @IsOptional() @Type(() => Number) @IsNumber() offset: number;

    @ApiProperty({ required: false }) @IsOptional() categoryId: string;

    @ApiProperty({ required: false }) @IsOptional() keyword: string;

    @ApiProperty({ required: false }) @IsOptional() sortField: string;

    @ApiProperty({ required: false }) @IsOptional() @Type(() => Number) sortType: string;

    @ApiProperty({required:false}) @IsOptional() @IsBoolean() @Transform(({ value}) => value === 'true') isDisplayAtBanner: boolean
}
