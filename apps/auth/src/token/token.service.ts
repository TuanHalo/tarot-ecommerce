import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { TokenRepository } from './token.repository';
import { CreateTokenDto } from './dto/create-token.dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(
    private readonly tokenRepository: TokenRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async create(createTokenDto: CreateTokenDto) {
    await this.validateCreateTokenDto(createTokenDto);

    return this.tokenRepository.create(createTokenDto);
  }

  private async validateCreateTokenDto(createTokenDto: CreateTokenDto) {
    try {
      await this.tokenRepository.findOne({ ...createTokenDto });
    } catch (error) {
      return;
    }
    throw new UnprocessableEntityException('Email already exits');
  }

  async verifyToken(refreshToken: string) {
    try {
      const { userId } = this.jwtService.verify(refreshToken, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      });

      await this.tokenRepository.findOne({ refreshToken, userId });
      const accessToken = this.jwtService.sign(
        { userId },
        {
          expiresIn: `${this.configService.get('JWT_ACCESS_EXPIRATION')}m`,
          secret: this.configService.get('JWT_ACCESS_SECRET'),
        },
      );

      return { accessToken };
    } catch (error) {
      throw new UnauthorizedException('Refresh token expired');
    }
  }
}
