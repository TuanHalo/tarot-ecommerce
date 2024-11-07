import { AbstractRepository } from "@app/common/database/abstract.repository";
import { Injectable, Logger } from "@nestjs/common";
import { TokenDocument } from "./models/token.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class TokenRepository extends AbstractRepository<TokenDocument> {
    protected readonly logger = new Logger(TokenRepository.name)

    constructor(
        @InjectModel(TokenDocument.name)
        tokenModel: Model<TokenDocument>
    ) {
        super(tokenModel)
    }
}