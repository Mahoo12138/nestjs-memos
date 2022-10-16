import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const SessionUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return req.session.passport?.user || req.user;
  },
);
