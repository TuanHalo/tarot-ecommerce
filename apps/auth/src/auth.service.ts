import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from './user/models/user.schema';
import { TokenPayLoad } from './interfaces/token-payload.interface';
import { Response } from 'express';
import { TokenService } from './token/token.service';

@Injectable()
export class AuthService {
  constructor(private readonly configService: ConfigService, private readonly jwtService: JwtService, private readonly tokenService: TokenService) {}

  async login(user: UserDocument, response: Response) {
    const tokenPayLoad: TokenPayLoad = {
      userId: user._id.toHexString()
    }

    const expires = new Date()
    expires.setDate(
      expires.getDate() + this.configService.get("JWT_REFRESH_EXPIRATION")
    )

    const refreshToken = this.jwtService.sign(tokenPayLoad, 
      {
        expiresIn: `2m`,
        secret: this.configService.get("JWT_REFRESH_SECRET")
      })

    this.tokenService.create({ refreshToken, userId: user._id.toString()})

    response.cookie("Authentication", refreshToken, {
      httpOnly: true,
      expires
    })

    const accessToken = this.jwtService.sign(tokenPayLoad,
      {
        expiresIn: `${this.configService.get("JWT_ACCESS_EXPIRATION")}m`,
        secret: this.configService.get("JWT_ACCESS_SECRET")
      }
    )

    return accessToken
  }
}
