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
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { GetUser } from 'src/common/get-user.decorator';
import { ApiError, ApiOK } from 'src/common/api-response';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'create category' })
  @HttpCode(HttpStatus.OK)
  async create(@Body() createCategoryDto: CreateCategoryDto, @GetUser() admin) {
    try {
      const result = await this.categoryService.create(
        createCategoryDto,
        admin,
      );
      return new ApiOK(result);
    } catch (error) {
      throw new ApiError(error.message);
    }
  }

  @Get()
  @ApiOperation({ summary: 'get category list' })
  @HttpCode(HttpStatus.OK)
  async findAll() {
    try {
      const result = await this.categoryService.findAll();
      return new ApiOK(result);
    } catch (error) {
      throw new ApiError(error.message);
      //
    }
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'get category detail' })
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    try {
      const result = await this.categoryService.findOne(id);
      return new ApiOK(result);
    } catch (error) {
      throw new ApiError(error.message);
    }
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'edit category' })
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @GetUser() admin,
  ) {
    try {
      const result = await this.categoryService.update(
        id,
        updateCategoryDto,
        admin,
      );
      return new ApiOK(result);
    } catch (error) {
      throw new ApiError(error.message);
    }
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'delete category' })
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string, @GetUser() admin) {
    try {
      const result = await this.categoryService.remove(id, admin);
      return new ApiOK(result);
    } catch (error) {
      throw new ApiError(error.message);
    }
  }
}
