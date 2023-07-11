import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { DemoOneSoftDeleteService } from './demoOneSoftDelete.service';
import { DemoOneSoftDelete } from './demoOneSoftDelete.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiPaginatedResponse } from '@/utils/swagger';
import { Pagination } from '@/dto/Pagination';

@ApiTags('demoOneSoftDelete')
@Controller('demoOneSoftDelete')
export class DemoOneSoftDeleteController {
  constructor(
    private readonly demoOneSoftDeleteService: DemoOneSoftDeleteService,
  ) {}

  @Get('/page')
  @ApiPaginatedResponse(DemoOneSoftDelete)
  @ApiOperation({
    summary: '分页查询',
    description: '分页查询',
  })
  async page(@Query('page') page: number, @Query('pageSize') pageSize: number) {
    page = Number(page);
    pageSize = Number(pageSize);
    const [data, total] = await this.demoOneSoftDeleteService.findAndCount(
      page,
      pageSize,
    );
    const pagination: Pagination<DemoOneSoftDelete> = {
      data: data || [],
      page,
      pageSize,
      total,
    };
    return pagination;
  }

  @Post('/create')
  async create(@Body() demoOneDto: DemoOneSoftDelete) {
    return this.demoOneSoftDeleteService.create(demoOneDto);
  }

  @Get('get')
  async findOne(@Query('id') id: string) {
    return this.demoOneSoftDeleteService.findOne(id);
  }

  @Post('/update')
  async update(@Body() demoOneDto: DemoOneSoftDelete) {
    return this.demoOneSoftDeleteService.update(demoOneDto.id, demoOneDto);
  }

  @Post('/remove/:id')
  async remove(@Param('id') id: string) {
    return this.demoOneSoftDeleteService.remove(id);
  }
}
