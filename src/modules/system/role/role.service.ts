import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, In, Repository } from 'typeorm';
import { Role } from './role.entity';
import { SchedulerRegistry } from '@nestjs/schedule';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private schedulerRegistry: SchedulerRegistry,
  ) {}

  async create(entityData: Partial<Role>): Promise<Role> {
    const entity = this.roleRepository.create(entityData);
    const res = await this.roleRepository.save(entity);
    this.schedulerRegistry.getCronJob('queryRoles').fireOnTick();
    return res;
  }

  async findAndCount(
    page: number,
    limit: number,
    options?: FindManyOptions<Role>,
  ) {
    return await this.roleRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
      ...options,
    });
  }

  async findOne(id: string): Promise<Role> {
    return this.roleRepository.findOne({
      where: { id },
      relations: ['permissions'],
      withDeleted: true,
    });
  }

  async update(id: string, entityData: Partial<Role>): Promise<Role> {
    await this.roleRepository.save(entityData);
    const res = await this.roleRepository.findOne({
      where: { id },
      relations: ['permissions'],
    });
    this.schedulerRegistry.getCronJob('queryRoles').fireOnTick();
    return res;
  }

  async remove(id: string): Promise<void> {
    await this.roleRepository.delete({ id });
  }

  async findByIds(ids: string[]) {
    return await this.roleRepository.findBy({ id: In(ids) });
  }
}
