import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { UserDocument } from "apps/auth/src/user/models/user.schema";

const getCurrentUserByContext = (context: ExecutionContext): Omit<UserDocument, 'password'> => {
    return context.switchToHttp().getRequest().user;
}

export const CurrentUser = createParamDecorator(
    ( _data: unknown, context: ExecutionContext ) => getCurrentUserByContext(context)
)