import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { SystemConfig } from '../entity/systemConfig.entity';

@Injectable()
export class SystemConfigService {
  constructor(
    @InjectRepository(SystemConfig)
    private readonly systemConfigRepository: Repository<SystemConfig>,
  ) {}

  async create(entityData: Partial<SystemConfig>): Promise<SystemConfig> {
    const entity = this.systemConfigRepository.create(entityData);
    return this.systemConfigRepository.save(entity);
  }

  async findAndCount(
    page: number,
    limit: number,
    options?: FindManyOptions<SystemConfig>,
  ) {
    return await this.systemConfigRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
      ...options,
    });
  }

  async findOne(id: string): Promise<SystemConfig> {
    return this.systemConfigRepository.findOne({
      where: { id },
      withDeleted: true,
    });
  }

  async update(
    id: string,
    entityData: Partial<SystemConfig>,
  ): Promise<SystemConfig> {
    await this.systemConfigRepository.update(id, entityData);
    return this.systemConfigRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    await this.systemConfigRepository.delete({ id });
  }
}
