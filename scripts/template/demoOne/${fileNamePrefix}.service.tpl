import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { <%= entityName %> } from './<%= fileNamePrefix %>.entity';

@Injectable()
export class <%= entityName %>Service {
  constructor(
    @InjectRepository(<%= entityName %>)
    private readonly <%= fileNamePrefix %>Repository: Repository<<%= entityName %>>,
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
    return this.<%= fileNamePrefix %>Repository.findOne({ where: { id }, withDeleted: true });
  }

  async update(id: string, entityData: Partial<<%= entityName %>>): Promise<<%= entityName %>> {
    await this.<%= fileNamePrefix %>Repository.update(id, entityData);
    return this.<%= fileNamePrefix %>Repository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    await this.<%= fileNamePrefix %>Repository.<%= isSoftDelete? 'softRemove' : 'delete' %>({ id });
  }
}
