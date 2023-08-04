/**
 * 用户登陆token内的数据
 * private readonly httpCommonDataProvider: HttpCommonDataProvider,
 * const tokenData = this.httpCommonDataProvider.getTokenData()
 */
export class TokenData {
  userId: string;
  username: string;
  roleIds: string[];

  iat?: number;
  exp?: number;
}
