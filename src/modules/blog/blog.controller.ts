import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { GetUser } from 'src/common/get-user.decorator';
import { ApiError, ApiOK } from 'src/common/api-response';
import { BlogListDTO } from './dto/get-blog-list.dto';

@Controller('blog')
@ApiTags('Blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'create new blog' })
  @HttpCode(HttpStatus.OK)
  async create(@Body() createBlogDto: CreateBlogDto, @GetUser() admin) {
    try {
      const result = await this.blogService.create(createBlogDto, admin);
      return new ApiOK(result);
    } catch (error) {
      throw new ApiError(error.message);
    }
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'get blog list' })
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() blogListDTO: BlogListDTO) {
    try {
      const result = await this.blogService.findAll(blogListDTO);
      return new ApiOK(result);
    } catch (error) {
      throw new ApiError(error.message);
    }
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'get blog detail' })
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    try {
      const result = await this.blogService.findOne(id);
      return new ApiOK(result);
    } catch (error) {
      throw new ApiError(error.message);
    }
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'edit blog detail' })
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() updateBlogDto: UpdateBlogDto,
    @GetUser() admin,
  ) {
    try {
      const result = await this.blogService.update(id, updateBlogDto, admin);
      return new ApiOK(result);
    } catch (error) {
      throw new ApiError(error.message);
    }
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'delete blog ' })
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    try {
      const result = await this.blogService.remove(id);
      return new ApiOK(result);
    } catch (error) {
      throw new ApiError(error.message);
    }
  }
}
