import { Controller, Post, Req, UnauthorizedException } from '@nestjs/common';
import { TokenService } from './token.service';
import { Request } from 'express';

@Controller()
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Post('refresh-token')
  async refreshToken(@Req() req: Request) {
    const refreshToken = req?.cookies?.Authentication;

    if (refreshToken) {
      return this.tokenService.verifyToken(refreshToken);
    } else {
      throw new UnauthorizedException('Refresh token expired');
    }
  }
}
