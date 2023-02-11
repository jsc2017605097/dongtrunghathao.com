import { ApiProperty } from "@nestjs/swagger";

export class CreateBannerDto {
    @ApiProperty({ required: true })
    url: string;
}
