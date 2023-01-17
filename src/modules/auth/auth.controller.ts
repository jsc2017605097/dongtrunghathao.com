import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { ApiError, ApiOK } from 'src/common/api-response';
import { ApiTags } from '@nestjs/swagger';

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
}
