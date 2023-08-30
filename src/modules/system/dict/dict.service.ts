import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { Dict } from './entity/dict.entity';
import { DictItem } from './entity/dictItem.entity';
import { HttpCommonDataProvider } from '@/common/provider/HttpCommonDataProvider';

@Injectable()
export class DictService {
  constructor(
    @InjectRepository(Dict)
    private readonly dictRepository: Repository<Dict>,
    @InjectRepository(DictItem)
    private readonly dictItemRepository: Repository<DictItem>,
    private readonly httpCommonDataProvider: HttpCommonDataProvider,
  ) {}

  async create(entityData: Partial<Dict>): Promise<Dict> {
    const entity = this.dictRepository.create(entityData);
    return this.dictRepository.save(entity);
  }

  async findAndCount(
    page: number,
    limit: number,
    options?: FindManyOptions<Dict>,
  ) {
    return await this.dictRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
      ...options,
    });
  }

  async findOne(id: string): Promise<Dict> {
    return this.dictRepository.findOne({
      where: { id },
      withDeleted: true,
      relations: ['items'],
    });
  }

  async update(entityData: Partial<Dict>): Promise<boolean> {
    await this.dictRepository.save(entityData);
    return true;
  }

  async remove(id: string): Promise<void> {
    const parent = await this.findOne(id);
    if (parent.items.length) {
      await this.dictItemRepository.delete(parent.items.map((v) => v.id));
    }
    await this.dictRepository.delete({ id });
  }

  async findAll(options?: FindManyOptions<Dict>) {
    return await this.dictRepository.find(options);
  }

  async updateItems(entityData: Partial<Dict>): Promise<boolean> {
    const parent = await this.findOne(entityData.id);
    if (!parent) {
      throw new Error('父级字典不存在');
    }
    // 把旧的删了，重新添加
    if (parent.items.length) {
      this.dictItemRepository.delete(parent.items.map((v) => v.id));
    }
    if (entityData.items) {
      const items = entityData.items.map((v) => {
        const item = new DictItem();
        item.tenantId = this.httpCommonDataProvider.getTenantId();
        item.dictId = parent.id;
        Object.keys(v).map((key) => {
          item[key] = v[key];
        });
        delete item.id;
        return item;
      });
      this.dictItemRepository.save(items);
    }
    return true;
  }
}
