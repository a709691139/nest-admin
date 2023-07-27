import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { Permission } from './permission.entity';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  async create(entityData: Partial<Permission>): Promise<Permission> {
    const entity = this.permissionRepository.create(entityData);
    return this.permissionRepository.save(entity);
  }

  async findAndCount(
    page: number,
    limit: number,
    options?: FindManyOptions<Permission>,
  ) {
    return await this.permissionRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
      ...options,
    });
  }

  async findAll(options?: FindManyOptions<Permission>) {
    return this.permissionRepository.find(options);
  }

  async findOne(id: string): Promise<Permission> {
    return this.permissionRepository.findOne({
      where: { id },
      withDeleted: true,
    });
  }

  async update(
    id: string,
    entityData: Partial<Permission>,
  ): Promise<Permission> {
    await this.permissionRepository.update(id, entityData);
    return this.permissionRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    await this.permissionRepository.delete({ id });
  }
}
