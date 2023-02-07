import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { ApiError, ApiOK } from 'src/common/api-response';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt.guard';
import { GetUser } from 'src/common/get-user.decorator';
import { Admin } from 'mongodb';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Body() loginDTO: LoginDTO) {
    try {
      const result = await this.authService.login(loginDTO);
      return new ApiOK(result);
    } catch (error) {
      throw new ApiError(error.message);
    }
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'get profile' })
  @HttpCode(HttpStatus.OK)
  async getProfile(@GetUser() admin: Admin) {
    try {
      return new ApiOK(admin);
    } catch (error) {
      throw new ApiError(error.message);
    }
  }
}
