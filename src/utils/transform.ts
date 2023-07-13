import * as dayjs from 'dayjs';
import { Column, ColumnOptions, ValueTransformer } from 'typeorm';

export function DateColumn(options?: ColumnOptions): PropertyDecorator {
  return function (target, propertyKey): void {
    Column({ ...options, type: 'date', transformer: new DateTransformer() })(
      target,
      propertyKey,
    );
  };
}

export function DateTimeColumn(options?: ColumnOptions): PropertyDecorator {
  return function (target, propertyKey): void {
    Column({
      ...options,
      type: 'datetime',
      transformer: new DateTimeTransformer(),
    })(target, propertyKey);
  };
}

export class DateTransformer implements ValueTransformer {
  from(value: Date): string {
    if (!value) {
      return null;
    }
    return dayjs(value).format('YYYY-MM-DD');
  }

  to(value: string): string {
    if (!value) {
      return null;
    }
    console.log('to', value);
    return dayjs(value).format('YYYY-MM-DD');
  }
}

export class DateTimeTransformer implements ValueTransformer {
  from(value: Date): string {
    if (!value) {
      return null;
    }
    return dayjs(value).format('YYYY-MM-DD HH:mm:ss');
  }

  to(value: string): string {
    if (!value) {
      return null;
    }
    return dayjs(value).format('YYYY-MM-DD HH:mm:ss');
  }
}
