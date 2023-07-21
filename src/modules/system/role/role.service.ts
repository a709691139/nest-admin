import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { Role } from './role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async create(entityData: Partial<Role>): Promise<Role> {
    const entity = this.roleRepository.create(entityData);
    return this.roleRepository.save(entity);
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
    return this.roleRepository.findOne({ where: { id }, withDeleted: true });
  }

  async update(id: string, entityData: Partial<Role>): Promise<Role> {
    await this.roleRepository.update(id, entityData);
    return this.roleRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    await this.roleRepository.delete({ id });
  }
}
