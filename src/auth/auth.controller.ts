import {
  Controller,
  Get,
  Req ,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './auth.decorator';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @HttpCode(HttpStatus.OK)
  @Public()
  @Get('generate_token')
  @ApiResponse({ status: 200 , description: 'retorna tanto o token jwt quanto o csrftoken para usar nos metodos post , put e delete .' })
  async signIn(@Req() req) {
    const jwt = await this.authService.signIn()
    return { ...jwt , csrfToken: req.csrfToken()};
  }

}