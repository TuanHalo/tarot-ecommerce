import { Controller, Post, Body, Req, UnauthorizedException } from '@nestjs/common';
import { GetTokenDto } from './dto/get-token.dto';
import { TokenService } from './token.service';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Controller('token')
export class TokenController {
    constructor(private readonly tokenService: TokenService) {}

    @Post('refresh-token')
    async refreshToken(@Body() { userId }: GetTokenDto, @Req() req: Request) {
       const refreshToken = req?.cookies?.Authentication;

       if (refreshToken) {
        return this.tokenService.verifyToken(refreshToken, userId)
       } else {
            throw new UnauthorizedException("Refresh token expired")
       }
    }
}
