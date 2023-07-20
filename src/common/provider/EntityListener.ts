import { DemoOneSoftDelete } from '@/modules/demo/demoOneSoftDelete/demoOneSoftDelete.entity';
import { HttpCommonDataProvider } from '@/common/provider/HttpCommonDataProvider';
import {
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
  Scope,
  createParamDecorator,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
  LoadEvent,
  DataSource,
  TransactionStartEvent,
} from 'typeorm';

// @Injectable({ scope: Scope.REQUEST })
@EventSubscriber()
export class PostSubscriber implements EntitySubscriberInterface {
  constructor(private readonly dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }
  // @Inject()
  // private readonly httpCommonDataProvider: HttpCommonDataProvider;

  beforeInsert(event: InsertEvent<any>) {
    const { entity } = event;
    Logger.debug(`BEFORE INSERT: `, entity);
  }

  afterLoad(entity: any, _event?: LoadEvent<any>) {
    // Logger.debug('Post afterLoad:');
    // Logger.debug('Post afterLoad:', entity, _event);
  }
  beforeTransactionStart(event: TransactionStartEvent) {
    // Logger.debug('beforeTransactionStart', event);
  }
}
