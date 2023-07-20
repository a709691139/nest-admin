import { SetMetadata } from '@nestjs/common';

/** 不需要登陆就加这个 */
export const NotNeedLogin = () => SetMetadata('notNeedLogin', true);
