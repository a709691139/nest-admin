import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { DemoOneService } from './demoOne.service';
import { DemoOne } from './demoOne.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Pagination } from '@/dto/Pagination';
import { ApiPaginatedResponse } from '@/utils/swagger';

@ApiTags('demoOne')
@Controller('demoOne')
export class DemoOneController {
  constructor(private readonly demoOneService: DemoOneService) {}

  @Get('/page')
  @ApiPaginatedResponse(DemoOne)
  @ApiOperation({
    summary: '分页查询',
    description: '分页查询',
  })
  async page(@Query('page') page: number, @Query('pageSize') pageSize: number) {
    page = Number(page);
    pageSize = Number(pageSize);
    const [data, total] = await this.demoOneService.findAndCount(
      page,
      pageSize,
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
  async create(@Body() demoOneDto: DemoOne) {
    return this.demoOneService.create(demoOneDto);
  }

  @Get('get')
  @ApiResponse({ type: DemoOne })
  async findOne(@Query('id') id: string) {
    return this.demoOneService.findOne(id);
  }

  @Post('/update')
  async update(@Body() demoOneDto: DemoOne) {
    return this.demoOneService.update(demoOneDto.id, demoOneDto);
  }

  @Post('/remove/:id')
  async remove(@Param('id') id: string) {
    return this.demoOneService.remove(id);
  }
}
