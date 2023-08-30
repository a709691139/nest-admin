import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { <%= entityName %> } from './entity/<%= fileNamePrefix %>.entity';
import { <%= sub.entityName %> } from './entity/<%= sub.fileNamePrefix %>.entity';
import { HttpCommonDataProvider } from '@/common/provider/HttpCommonDataProvider';

@Injectable()
export class <%= entityName %>Service {
  constructor(
    @InjectRepository(<%= entityName %>)
    private readonly <%= fileNamePrefix %>Repository: Repository<<%= entityName %>>,
    @InjectRepository(<%= sub.entityName %>)
    private readonly <%= sub.fileNamePrefix %>Repository: Repository<<%= sub.entityName %>>,
    private readonly httpCommonDataProvider: HttpCommonDataProvider,
  ) {}

  async create(entityData: Partial<<%= entityName %>>): Promise<<%= entityName %>> {
    const entity = this.<%= fileNamePrefix %>Repository.create(entityData);
    return this.<%= fileNamePrefix %>Repository.save(entity);
  }

  async findAndCount(
    page: number,
    limit: number,
    options?: FindManyOptions<<%= entityName %>>,
  ) {
    return await this.<%= fileNamePrefix %>Repository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
      ...options,
    });
  }

  async findOne(id: string): Promise<<%= entityName %>> {
    return this.<%= fileNamePrefix %>Repository.findOne({
      where: { id },
      withDeleted: true,
      relations: ['items'],
    });
  }

  async update(entityData: Partial<<%= entityName %>>): Promise<boolean> {
    await this.<%= fileNamePrefix %>Repository.save(entityData);
    return true;
  }

  async remove(id: string): Promise<void> {
    const parent = await this.findOne(id);
    if (parent.items.length) {
      await this.<%= sub.fileNamePrefix %>Repository.delete(parent.items.map((v) => v.id));
    }
    await this.<%= fileNamePrefix %>Repository.delete({ id });
  }

  async findAll(options?: FindManyOptions<<%= entityName %>>) {
    return await this.<%= fileNamePrefix %>Repository.find(options);
  }

  async updateItems(entityData: Partial<<%= entityName %>>): Promise<boolean> {
    const parent = await this.findOne(entityData.id);
    if (!parent) {
      throw new Error('父级字典不存在');
    }
    // 把旧的删了，重新添加
    if (parent.items.length) {
      this.<%= sub.fileNamePrefix %>Repository.delete(parent.items.map((v) => v.id));
    }
    if (entityData.items) {
      const items = entityData.items.map((v) => {
        const item = new <%= sub.entityName %>();
        item.tenantId = this.httpCommonDataProvider.getTenantId();
        item.<%= fileNamePrefix %>Id = parent.id;
        Object.keys(v).map((key) => {
          item[key] = v[key];
        });
        delete item.id;
        return item;
      });
      this.<%= sub.fileNamePrefix %>Repository.save(items);
    }
    return true;
  }
}
