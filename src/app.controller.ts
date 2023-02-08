import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation } from '@nestjs/swagger';
import { ApiOK } from './common/api-response';
import { FileInterceptor } from '@nestjs/platform-express';
import axios from 'axios';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/api/ckfinder/upload-image')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'upload image by ckeditor' })
  @UseInterceptors(FileInterceptor('upload'))
  async uploadImage(@UploadedFile() file) {
    var FormData = require('form-data');
    var data = new FormData();
    data.append('image', file.buffer);

    var config = {
      method: 'post',
      url: 'https://api.imgur.com/3/image',
      headers: {
        Authorization: 'Client-ID 6db47bd7029562d',
        Cookie: 'IMGURSESSION=b8b7ff31e4a458dd87172136dbb95761; _nc=1',
        ...data.getHeaders(),
      },
      data: data,
    };

    const result = await axios(config)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.log(error.message);
      });
    return {
      uploaded: true,
      url: result.data.link,
      name: file.originalname,
    };
  }
}
