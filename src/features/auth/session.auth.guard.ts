import { AuthGuard } from '@nestjs/passport';

export class SessionGuard extends AuthGuard(['openid', 'memos-session']) {}
