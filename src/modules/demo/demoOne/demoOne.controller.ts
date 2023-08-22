import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Type,
} from '@nestjs/common';
import { DemoOneService } from './demoOne.service';
import { DemoOne } from './demoOne.entity';
import {
  ApiOperation,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Pagination } from '@/common/dto/ResponseWrap';
import {
  ApiPaginatedResponse,
  ApiResponseWrap,
} from '@/common/decorator/swagger';
import { HttpCommonDataProvider } from '@/common/provider/HttpCommonDataProvider';
import { createQueryWrapper } from '@/utils/query';
import { responseSuccess } from '@/utils/result';

@ApiTags('demoOne')
@Controller('demoOne')
export class DemoOneController {
  constructor(
    private readonly demoOneService: DemoOneService,
    private readonly httpCommonDataProvider: HttpCommonDataProvider,
  ) {}

  @Get('/page')
  @ApiPaginatedResponse(DemoOne)
  @ApiOperation({
    summary: '分页查询',
    description: '分页查询',
  })
  async page(
    @Query('page') page: number,
    @Query('perPage') perPage: number,
    @Query() query: DemoOne,
  ) {
    query.tenantId = this.httpCommonDataProvider.getTenantId();
    page = Number(page);
    perPage = Number(perPage);
    const [data, total] = await this.demoOneService.findAndCount(
      page,
      perPage,
      createQueryWrapper(query),
    );
    const pagination: Pagination<DemoOne> = {
      data: data || [],
      page,
      perPage,
      total,
    };
    return responseSuccess(pagination);
  }

  @Post('/create')
  @ApiResponseWrap(DemoOne)
  async create(@Body() dto: DemoOne) {
    dto.tenantId = this.httpCommonDataProvider.getTenantId();
    return responseSuccess(await this.demoOneService.create(dto));
  }

  @Get('get')
  @ApiResponseWrap(DemoOne)
  async findOne(@Query('id') id: string) {
    return responseSuccess(await this.demoOneService.findOne(id));
  }

  @Post('/update')
  @ApiResponseWrap(DemoOne)
  async update(@Body() dto: DemoOne) {
    return responseSuccess(await this.demoOneService.update(dto.id, dto));
  }

  @Post('/remove/:id')
  async remove(@Param('id') id: string) {
    return responseSuccess(await this.demoOneService.remove(id));
  }
}
