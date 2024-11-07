import { IsNotEmpty } from "class-validator";

export class CreateTokenDto {
    @IsNotEmpty()
    refreshToken: string;

    @IsNotEmpty()
    userId: string
}