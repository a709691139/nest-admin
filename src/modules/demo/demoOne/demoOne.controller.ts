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
import { Pagination } from '@/dto/Pagination';
import { ApiPaginatedResponse, ApiResponseWrap } from '@/utils/swagger';
import { HttpCommonDataProvider } from '@/provider/HttpCommonDataProvider';
import { createQueryWrapper } from '@/utils/query';

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
    @Query('pageSize') pageSize: number,
    @Query() query: DemoOne,
  ) {
    query.tenantId = this.httpCommonDataProvider.getTenantId();
    page = Number(page);
    pageSize = Number(pageSize);
    const [data, total] = await this.demoOneService.findAndCount(
      page,
      pageSize,
      {
        where: createQueryWrapper(query),
      },
    );
    const pagination: Pagination<DemoOne> = {
      data: data || [],
      page,
      pageSize,
      total,
    };
    return pagination;
  }

  @Post('/create')
  @ApiResponse({ type: DemoOne })
  async create(@Body() dto: DemoOne) {
    dto.tenantId = this.httpCommonDataProvider.getTenantId();
    return this.demoOneService.create(dto);
  }

  @Get('get')
  @ApiResponse({ type: DemoOne })
  async findOne(@Query('id') id: string) {
    return this.demoOneService.findOne(id);
  }

  @Post('/update')
  @ApiResponseWrap(DemoOne)
  async update(@Body() dto: DemoOne) {
    return this.demoOneService.update(dto.id, dto);
  }

  @Post('/remove/:id')
  async remove(@Param('id') id: string) {
    return this.demoOneService.remove(id);
  }
}
