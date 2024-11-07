import { AbstractDocument } from "@app/common/database/abstract.schema";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ versionKey: false })
export class TokenDocument extends AbstractDocument {
    @Prop()
    refreshToken: string

    @Prop()
    userId: string
}

export const TokenSchema = SchemaFactory.createForClass(TokenDocument);