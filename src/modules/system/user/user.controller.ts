import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Pagination } from '@/common/dto/ResponseWrap';
import {
  ApiPaginatedResponse,
  ApiResponseWrap,
} from '@/common/decorator/swagger';
import { HttpCommonDataProvider } from '@/common/provider/HttpCommonDataProvider';
import { createQueryWrapper } from '@/utils/query';
import {
  LoginPasswordUserDto,
  RegisUserDto,
  LoginSuccessResponseDto,
} from './user.dto';
import { responseError, responseSuccess } from '@/utils/result';
import { NotNeedLogin } from '@/common/decorator/NotNeedLogin';
import { UserAuthService } from './userAuth.service';

@ApiTags('系统用户 sys_user')
@Controller('sys_user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userAuthService: UserAuthService,
    private readonly httpCommonDataProvider: HttpCommonDataProvider,
  ) {}

  @Get('/page')
  @ApiPaginatedResponse(User)
  @ApiOperation({
    summary: '分页查询',
    description: '分页查询',
  })
  async page(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Query() query: User,
  ) {
    query.tenantId = this.httpCommonDataProvider.getTenantId();
    page = Number(page);
    pageSize = Number(pageSize);
    const [data, total] = await this.userService.findAndCount(page, pageSize, {
      where: createQueryWrapper(query),
    });
    const pagination: Pagination<User> = {
      data: data || [],
      page,
      pageSize,
      total,
    };
    return responseSuccess(pagination);
  }

  @Post('/regis')
  @ApiOperation({ summary: '注册用户名' })
  @ApiResponseWrap(User)
  @NotNeedLogin()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async regis(@Body() dto: RegisUserDto) {
    const user = await this.userService.create({
      ...dto,
      tenantId: this.httpCommonDataProvider.getTenantId(),
    });
    return responseSuccess(user);
  }

  @Post('/loginByPassword')
  @ApiOperation({ summary: '密码登陆' })
  @NotNeedLogin()
  @ApiResponseWrap(LoginSuccessResponseDto)
  async loginByPassword(@Body() dto: LoginPasswordUserDto) {
    // 校验图片验证码 TODO
    // 校验密码正确
    const user = await this.userService.findOneByOptions({
      where: {
        tenantId: this.httpCommonDataProvider.getTenantId(),
        username: dto.username,
      },
      select: ['id', 'username', 'password', 'status'],
      withDeleted: false,
    });
    const errMsg = '用户名或密码错误';
    if (!user) {
      return responseError(errMsg);
    }
    if (user.status === '0') {
      return responseError('该用户已被禁用');
    }
    if (!user.id || !user.validatePassword(dto.password)) {
      return responseError(errMsg);
    }
    const data = await this.userAuthService.loginSuccess(user.id);
    return responseSuccess(data);
  }

  @Post('/logout')
  @ApiOperation({ summary: '退出登陆' })
  async logout() {
    await this.userAuthService.logout();
    return responseSuccess('');
  }

  @Post('/create')
  @ApiResponseWrap(User)
  async create(@Body() dto: User) {
    dto.tenantId = this.httpCommonDataProvider.getTenantId();
    return responseSuccess(await this.userService.create(dto));
  }

  @Get('get')
  @ApiResponseWrap(User)
  async findOne(@Query('id') id: string) {
    Logger.debug('TokenData', this.httpCommonDataProvider.getTokenData());
    return responseSuccess(await this.userService.findOne(id));
  }

  @Post('/update')
  async update(@Body() dto: User) {
    return responseSuccess(await this.userService.update(dto.id, dto));
  }

  @Post('/remove/:id')
  async remove(@Param('id') id: string) {
    return responseSuccess(await this.userService.remove(id));
  }
}
