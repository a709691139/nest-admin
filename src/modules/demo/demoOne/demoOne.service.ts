import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { DemoOne } from './demoOne.entity';

@Injectable()
export class DemoOneService {
  constructor(
    @InjectRepository(DemoOne)
    private readonly demoOneRepository: Repository<DemoOne>,
  ) {}

  async create(entityData: Partial<DemoOne>): Promise<DemoOne> {
    const entity = this.demoOneRepository.create(entityData);
    return this.demoOneRepository.save(entity);
  }

  async findAndCount(
    page: number,
    limit: number,
    options?: FindManyOptions<DemoOne>,
  ) {
    return await this.demoOneRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
      ...options,
    });
  }

  async findOne(id: string): Promise<DemoOne> {
    return this.demoOneRepository.findOne({ where: { id }, withDeleted: true });
  }

  async update(id: string, entityData: Partial<DemoOne>): Promise<DemoOne> {
    await this.demoOneRepository.update(id, entityData);
    return this.demoOneRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    await this.demoOneRepository.delete({ id });
  }
}
