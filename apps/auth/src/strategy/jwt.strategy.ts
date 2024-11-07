import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { UserService } from "../user/user.service";
import { ExtractJwt, Strategy } from "passport-jwt";
import { TokenPayLoad } from "../interfaces/token-payload.interface";
import { JsonWebTokenError, TokenExpiredError } from "@nestjs/jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        configService: ConfigService,
        private readonly userService: UserService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get('JWT_ACCESS_SECRET')
        })
    }

    async validate({ userId } : TokenPayLoad) {
        return this.userService.getUser({_id: userId})
    }
}