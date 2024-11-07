import { Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { TokenRepository } from './token.repository';
import { CreateTokenDto } from './dto/create-token.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TokenService {
    constructor(private readonly tokenRepository: TokenRepository, private readonly jwtService: JwtService, private readonly configService: ConfigService) {}

    async create(createTokenDto: CreateTokenDto) {
        await this.validateCreateTokenDto(createTokenDto)

        return this.tokenRepository.create(createTokenDto)
    }

    private async validateCreateTokenDto(createTokenDto: CreateTokenDto) {
        try {
            await this.tokenRepository.findOne( { ...createTokenDto } )
        } catch (error) {
            return;
        }
        throw new UnprocessableEntityException("Email already exits")
    }

    async verifyToken(refreshToken: string, userId: string) {
        try {
            const { id } = await this.jwtService.verifyAsync(refreshToken)

            if (id !== userId) {
                throw new UnauthorizedException("Invalid token")
            }

            await this.tokenRepository.findOne({ refreshToken, userId });
            const accessToken = this.jwtService.sign({ userId },
            {
                expiresIn: `${this.configService.get("JWT_ACCESS_EXPIRATION")}m`,
                secret: this.configService.get("JWT_ACCESS_SECRET")
            })

            return { accessToken }
        } catch (error) {
            throw new UnauthorizedException("Refresh token expired")
        }
    }


}
