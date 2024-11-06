import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from './user/models/user.schema';
import { TokenPayLoad } from './interfaces/token-payload.interface';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(private readonly configService: ConfigService, private readonly jwtService: JwtService) {}

  async login(user: UserDocument, response: Response) {
    const tokenPayLoad: TokenPayLoad = {
      userId: user._id.toHexString()
    }

    const expires = new Date()
    expires.setSeconds(
      expires.getSeconds() + this.configService.get("JWT_EXPIRATION")
    )

    const token = this.jwtService.sign(tokenPayLoad)

    response.cookie("Authentication", token, {
      httpOnly: true,
      expires
    })

    return token
  }
}
