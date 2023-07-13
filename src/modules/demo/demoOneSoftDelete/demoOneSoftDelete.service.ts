import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { DemoOneSoftDelete } from './demoOneSoftDelete.entity';
import { HttpCommonDataProvider } from '@/provider/HttpCommonDataProvider';

@Injectable()
export class DemoOneSoftDeleteService {
  constructor(
    @InjectRepository(DemoOneSoftDelete)
    private readonly demoOneRepository: Repository<DemoOneSoftDelete>,
    private readonly httpCommonDataProvider: HttpCommonDataProvider,
  ) {}

  async create(
    entityData: Partial<DemoOneSoftDelete>,
  ): Promise<DemoOneSoftDelete> {
    const entity = this.demoOneRepository.create(entityData);
    return this.demoOneRepository.save(entity);
  }

  async findAndCount(
    page: number,
    limit: number,
    options?: FindManyOptions<DemoOneSoftDelete>,
  ) {
    return await this.demoOneRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
      ...options,
    });
  }

  async findOne(id: string): Promise<DemoOneSoftDelete> {
    return this.demoOneRepository.findOne({ where: { id } });
  }

  async update(
    id: string,
    entityData: Partial<DemoOneSoftDelete>,
  ): Promise<DemoOneSoftDelete> {
    await this.demoOneRepository.update(id, entityData);
    return this.demoOneRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    await this.demoOneRepository.softRemove({ id });
  }
}
