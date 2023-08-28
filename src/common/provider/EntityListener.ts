import { Inject, Logger } from '@nestjs/common';
import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
  LoadEvent,
  DataSource,
  TransactionStartEvent,
} from 'typeorm';

@EventSubscriber()
export class PostSubscriber implements EntitySubscriberInterface {
  constructor(private readonly dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  beforeInsert(event: InsertEvent<any>) {
    const { entity } = event;
    // Logger.debug(`BEFORE INSERT: `, entity);
  }

  afterLoad(entity: any, _event?: LoadEvent<any>) {
    // Logger.debug('Post afterLoad:');
    // Logger.debug('Post afterLoad:', entity, _event);
  }
  beforeTransactionStart(event: TransactionStartEvent) {
    // Logger.debug('beforeTransactionStart', event);
  }
}
