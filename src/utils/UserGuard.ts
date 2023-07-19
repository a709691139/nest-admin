import { SetMetadata } from '@nestjs/common';

export const AuthGuard = () => SetMetadata('authRequired', true);
