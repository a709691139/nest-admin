import { Logger } from '@nestjs/common';
import {
  FindOptionsWhere,
  Not,
  Like,
  In,
  MoreThanOrEqual,
  LessThanOrEqual,
  MoreThan,
  LessThan,
  FindManyOptions,
} from 'typeorm';

/**
 * 创建查询条件, 自动去除空字符串和undefined
 * 1、支持模糊查询 前后带*
 * 2、取非查询	在查询输入框前面输入! 则查询该字段不等于输入值的数据 (数值类型不支持此种查询,可以将数值字段定义为字符串类型的)
 * 3、in查询	若传入的数据带,(逗号) 则表示该查询为in查询
 * 4、时间范围查询，需包含两个字段：{*}_begin，{*}_end
 * 5、大小查询："lt 100" 中间空格 , 小于查询 lt 100, 小于等于 le 100, 大于 gt 100, 大于等于 ge 100
 * 6、排序 orderBy: platform, orderDir: desc
 */
export function createQueryWrapper<T>(param: T) {
  const options: FindManyOptions<T> = {
    where: {},
  };
  if (!param) {
    return options;
  }
  const keys = Object.keys(param);
  const ignoreKeys = ['page', 'perPage', 'orderBy', 'orderDir'];
  keys.forEach(key => {
    if (param[key] === undefined) return;
    if (param[key] === '') return;
    if (ignoreKeys.includes(key)) {
      return;
    }
    const value = param[key];
    if (typeof value === 'string' && value.length > 1) {
      if (value[0] === '*' || value.slice(-1) === '*') {
        let likeStr = value;
        if (likeStr[0] === '*') likeStr = likeStr.replace(/^./, '%');
        if (likeStr.slice(-1) === '*') likeStr = likeStr.slice(0, -1) + '%';
        options.where[key] = Like(likeStr);
      } else if (value[0] === '!') {
        options.where[key] = Not(value.replace(/^./, ''));
      } else if (value.includes(',')) {
        options.where[key] = In(value.split(','));
      } else if (/_begin$/.test(key)) {
        const endTimeKey = key.slice(0, key.length - 6) + '_end';
        if (keys.find(v => v === endTimeKey)) {
          options.where[key] = MoreThanOrEqual(value);
          options.where[endTimeKey] = LessThanOrEqual(param[endTimeKey]);
        }
      } else if (/_end$/.test(key)) {
      } else if (/^(le|ge|gt|lt)\s.+/.test(value)) {
        const fnKey = value.slice(0, 2);
        const fns = {
          le: LessThanOrEqual,
          ge: MoreThanOrEqual,
          gt: MoreThan,
          lt: LessThan,
        };
        options.where[key] = fns[fnKey](value.substring(3));
      } else {
        options.where[key] = value;
      }
    } else {
      options.where[key] = value;
    }
  });
  if (keys.includes('orderBy')) {
    options.order = {
      [param['orderBy']]: param['orderDir'] || 'ASC',
    };
  }
  // Logger.debug('createQueryWrapper', createQueryWrapper);
  return options;
}
