import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  FindTreeOptions,
  Repository,
  TreeRepository,
} from 'typeorm';
import { Permission } from './permission.entity';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: TreeRepository<Permission>,
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

  async findTree(entity: Permission, options?: FindTreeOptions) {
    return this.permissionRepository.findDescendantsTree(entity, options);
  }

  async findOne(options: FindOptionsWhere<Permission>): Promise<Permission> {
    return this.permissionRepository.findOne({
      where: options,
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
    const entity = new Permission();
    entity.id = id;
    const childrenEntities = await this.permissionRepository.findDescendants(
      entity,
    );
    for (const childEntity of childrenEntities) {
      childEntity.parentId = null;
    }
    await this.permissionRepository.save(childrenEntities);
    await this.permissionRepository.remove(childrenEntities);
  }

  async creates(entityDatas: Array<Partial<Permission>>) {
    const list = entityDatas.map((v) => {
      return this.permissionRepository.create(v);
    });
    return this.permissionRepository.save(list);
  }
}
