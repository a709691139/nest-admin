import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SystemConfigService } from '../service/systemConfig.service';
import { SystemConfig } from '../entity/systemConfig.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Pagination } from '@/common/dto/ResponseWrap';
import {
  ApiPaginatedResponse,
  ApiResponseWrap,
} from '@/common/decorator/swagger';
import { HttpCommonDataProvider } from '@/common/provider/HttpCommonDataProvider';
import { createQueryWrapper } from '@/utils/query';
import { responseSuccess } from '@/utils/result';
import { NeedPermissions } from '@/common/decorator/NeedPermissions';
import { NotNeedLogin } from '@/common/decorator/NotNeedLogin';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OfficialCustomerServiceContactDto } from '../dto/systemConfig.dto';

@ApiTags('系统配置表 systemConfig')
@Controller('systemConfig')
export class SystemConfigController {
  constructor(
    private readonly systemConfigService: SystemConfigService,
    private readonly httpCommonDataProvider: HttpCommonDataProvider,
    @InjectRepository(SystemConfig)
    private readonly systemConfigRepository: Repository<SystemConfig>,
  ) {}

  @Get('/page')
  @ApiPaginatedResponse(SystemConfig)
  @ApiOperation({
    summary: '分页查询',
    description: '分页查询',
  })
  @NeedPermissions('sys_config:page')
  async page(
    @Query('page') page: number,
    @Query('perPage') perPage: number,
    @Query() query: SystemConfig,
  ) {
    query.tenantId = this.httpCommonDataProvider.getTenantId();
    page = Number(page);
    perPage = Number(perPage);
    const [data, total] = await this.systemConfigService.findAndCount(
      page,
      perPage,
      {
        ...createQueryWrapper(query),
      },
    );
    const pagination: Pagination<SystemConfig> = {
      data: data || [],
      page,
      perPage,
      total,
    };
    return responseSuccess(pagination);
  }

  @Post('/create')
  @NeedPermissions('sys_config:create')
  @ApiResponseWrap(SystemConfig)
  async create(@Body() dto: SystemConfig) {
    dto.tenantId = this.httpCommonDataProvider.getTenantId();
    return responseSuccess(await this.systemConfigService.create(dto));
  }

  @Get('get')
  @NeedPermissions('sys_config:get')
  @ApiResponseWrap(SystemConfig)
  async findOne(@Query('id') id: string) {
    return responseSuccess(await this.systemConfigService.findOne(id));
  }

  @Post('/update')
  @NeedPermissions('sys_config:update')
  @ApiResponseWrap(SystemConfig)
  async update(@Body() dto: SystemConfig) {
    return responseSuccess(await this.systemConfigService.update(dto.id, dto));
  }

  @Post('/remove/:id')
  @NeedPermissions('sys_config:remove')
  async remove(@Param('id') id: string) {
    return responseSuccess(await this.systemConfigService.remove(id));
  }

  @Post('getOfficialCustomerServiceContact')
  @ApiOperation({
    summary: '获取官方客服联系方式',
  })
  @NotNeedLogin()
  @ApiResponseWrap(OfficialCustomerServiceContactDto)
  async getOfficialCustomerService() {
    const entity = await this.systemConfigRepository.findOne({
      where: {
        id: 'OfficialCustomerServiceContact',
      },
      select: ['data'],
    });
    if (!entity || !entity.data) return responseSuccess(null);
    const data = JSON.parse(entity.data);
    return responseSuccess(data);
  }

  @Post('updateOfficialCustomerServiceContact')
  @ApiOperation({
    summary: '更新官方客服联系方式',
  })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @NeedPermissions('sys_config:updateOfficialCustomerServiceContact')
  @ApiResponseWrap()
  async updateOfficialCustomerServiceContact(
    @Body() dto: OfficialCustomerServiceContactDto,
  ) {
    dto.tenantId = this.httpCommonDataProvider.getTenantId();
    dto.id = 'OfficialCustomerServiceContact';
    return responseSuccess(
      await this.systemConfigRepository.save({
        id: dto.id,
        tenantId: dto.tenantId,
        data: JSON.stringify({ list: dto.list }),
      }),
    );
  }
}
