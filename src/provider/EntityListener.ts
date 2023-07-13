import { DemoOneSoftDelete } from '@/modules/demo/demoOneSoftDelete/demoOneSoftDelete.entity';
import { HttpCommonDataProvider } from '@/provider/HttpCommonDataProvider';
import {
  ExecutionContext,
  Inject,
  Injectable,
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
    console.log('PostSubscriber, constructor');
    dataSource.subscribers.push(this);
  }
  // @Inject()
  // private readonly httpCommonDataProvider: HttpCommonDataProvider;

  beforeInsert(event: InsertEvent<any>) {
    const { entity } = event;
    console.log(`BEFORE POST INSERTED: `, entity);
  }

  afterLoad(entity: any, _event?: LoadEvent<any>) {
    // console.log('Post afterLoad:');
    // console.log('Post afterLoad:', entity, _event);
  }
  beforeTransactionStart(event: TransactionStartEvent) {
    // console.log('beforeTransactionStart', event);
  }
}
