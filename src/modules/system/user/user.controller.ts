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
  ResetUserPasswordDto,
  UpdateMyInfoDto,
  UpdateMyPassowordDto,
  UpdateStatusReqDto,
  UpdateRolesDto,
  ResetPasswordReqDto,
} from './user.dto';
import { responseError, responseSuccess } from '@/utils/result';
import { NotNeedLogin } from '@/common/decorator/NotNeedLogin';
import { UserAuthService } from './userAuth.service';
import { NeedPermissions } from '@/common/decorator/NeedPermissions';

@ApiTags('系统用户 sys_user')
@Controller('sys_user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userAuthService: UserAuthService,
    private readonly httpCommonDataProvider: HttpCommonDataProvider,
  ) {}

  @Get('/page')
  @NeedPermissions('sys_user:page')
  @ApiPaginatedResponse(User)
  @ApiOperation({
    summary: '分页查询',
    description: '分页查询',
  })
  async page(
    @Query('page') page: number,
    @Query('perPage') perPage: number,
    @Query() query: User,
  ) {
    query.tenantId = this.httpCommonDataProvider.getTenantId();
    page = Number(page);
    perPage = Number(perPage);
    const [data, total] = await this.userService.findAndCount(page, perPage, {
      ...createQueryWrapper(query),
      relations: ['roles'],
    });
    const pagination: Pagination<User> = {
      data: data || [],
      page,
      perPage,
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
    if (
      !user.id ||
      !this.userAuthService.validateCryptPassword(dto.password, user.password)
    ) {
      return responseError(errMsg);
    }
    const data = await this.userAuthService.loginSuccess(user.id);
    return responseSuccess(data);
  }

  @Post('/logout')
  @ApiOperation({ summary: '退出登陆' })
  @ApiResponseWrap()
  async logout() {
    const { userId } = this.httpCommonDataProvider.getTokenData();
    await this.userAuthService.logout(userId);
    return responseSuccess('');
  }

  @Post('/create')
  @NeedPermissions('sys_user:create')
  @ApiResponseWrap(User)
  async create(@Body() dto: User) {
    dto.tenantId = this.httpCommonDataProvider.getTenantId();
    return responseSuccess(await this.userService.create(dto));
  }

  @Get('get')
  @ApiResponseWrap(User)
  @NeedPermissions('sys_user:get')
  async findOne(@Query('id') id: string) {
    return responseSuccess(await this.userService.findOne(id));
  }

  @Post('/update')
  @NeedPermissions('sys_user:update')
  @ApiResponseWrap()
  async update(@Body() dto: User) {
    return responseSuccess(await this.userService.update(dto.id, dto));
  }

  @Post('/remove/:id')
  @NeedPermissions('sys_user:remove')
  async remove(@Param('id') id: string) {
    return responseSuccess(await this.userService.remove(id));
  }

  @Get('/getCurrentUserInfo')
  @ApiOperation({ summary: '获取个人基础资料' })
  @ApiResponseWrap(User)
  async getCurrentUserInfo() {
    const { userId } = this.httpCommonDataProvider.getTokenData();
    return responseSuccess(await this.userService.findOne(userId));
  }

  @Post('/resetUserPassword')
  @ApiOperation({ summary: '重置用户密码' })
  @NeedPermissions('sys_user:reset_user_password')
  async resetUserPassword(@Body() dto: ResetUserPasswordDto) {
    await this.userAuthService.resetUserPassword(dto.userId, dto.password);
    return responseSuccess();
  }

  @Post('/updateCurrentUserInfo')
  @ApiOperation({ summary: '更新个人基础资料' })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @ApiResponseWrap()
  async updateMyInfo(@Body() dto: UpdateMyInfoDto) {
    const userId = this.httpCommonDataProvider.getTokenData().userId;
    return responseSuccess(await this.userService.update(userId, dto));
  }

  @Post('/updateCurrentUserPassoword')
  @ApiOperation({ summary: '修改个人密码' })
  @ApiResponseWrap()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async updateMyPassoword(@Body() dto: UpdateMyPassowordDto) {
    const userId = this.httpCommonDataProvider.getTokenData().userId;
    const isValid = await this.userAuthService.checkIsValidPassword(
      userId,
      dto.oldPassoword,
    );
    if (!isValid) {
      return responseError('当前密码不正确');
    }
    await this.userAuthService.resetUserPassword(userId, dto.newPassword);
    return responseSuccess();
  }

  @Post('/updateStatus')
  @ApiOperation({ summary: '启用或冻结用户' })
  @ApiResponseWrap()
  @NeedPermissions('sys_user:updateStatus')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async updateStatus(@Body() dto: UpdateStatusReqDto) {
    await this.userService.update(dto.userId, { status: dto.status });
    return responseSuccess();
  }

  @Post('/updateRoles')
  @ApiOperation({ summary: '分配角色' })
  @ApiResponseWrap()
  @NeedPermissions('sys_user:updateRoles')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async updateRoles(@Body() dto: UpdateRolesDto) {
    await this.userService.updateUserRole(dto);
    return responseSuccess();
  }

  @Post('/resetPassword')
  @ApiOperation({ summary: '重置密码' })
  @ApiResponseWrap()
  @NeedPermissions('sys_user:resetPassword')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async resetPassword(@Body() dto: ResetPasswordReqDto) {
    await this.userAuthService.resetUserPassword(dto.userId, dto.password);
    return responseSuccess();
  }
}
