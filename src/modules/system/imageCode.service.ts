import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import { BMP24 } from 'gd-bmp/dist/BMP24';
import Redis from 'ioredis';
import * as uuid from 'uuid';

@Injectable()
export class ImageCodeService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  /** 生成 图片验证码 */
  async createImageCode() {
    const { img, text: imageCode } = makeCapcha();
    const imageCodeId = uuid.v4().replace(/-/g, '');
    const imageUrl =
      'data:image/bmp;base64,' + img.getFileData().toString('base64');
    await this.redis.set('imageCode:' + imageCodeId, imageCode, 'EX', 60 * 3);
    return {
      imageCode,
      imageCodeId,
      imageUrl,
    };
  }
  /** 校验 图片验证码，校验成功后，要手动调用setImageCodeUnValid设置失效 */
  async checkValidImageCode(imageCodeId: string, imageCode: string) {
    const cacheImageCode: string = await this.redis.get(
      'imageCode:' + imageCodeId,
    );
    if (!cacheImageCode) {
      return false;
    }
    if (cacheImageCode.toLowerCase() !== imageCode.toLowerCase()) {
      this.setImageCodeUnValid(imageCodeId);
      return false;
    }
    return true;
  }
  /** 设置失效 图片验证码 */
  public async setImageCodeUnValid(imageCodeId: string) {
    await this.redis.del('imageCode:' + imageCodeId);
  }
}

function rand(min: number, max: number) {
  return (Math.random() * (max - min + 1) + min) | 0;
}

// 制造验证码图片， 5位数，如CAZP8
function makeCapcha() {
  const img = new BMP24(100, 40);
  // img.drawCircle(rand(0, 100), rand(0, 40), rand(10, 40), rand(0, 0xffffff));
  // 边框
  img.drawRect(0, 0, img.w - 1, img.h - 1, rand(0, 0xffffff));
  // img.fillRect(rand(0, 100), rand(0, 40), rand(10, 35), rand(10, 35), rand(0, 0xffffff));
  // img.drawLine(rand(0, 100), rand(0, 40), rand(0, 100), rand(0, 40), rand(0, 0xffffff));
  // return img;

  // 画曲线
  // const w = img.w / 2;
  // const h = img.h;
  // const color = rand(0, 0xffffff);
  // const y1 = rand(-5, 5); // Y轴位置调整
  // const w2 = rand(10, 15); // 数值越小频率越高
  // const h3 = rand(4, 6); // 数值越小幅度越大
  // const bl = rand(1, 5);
  // for (let i = -w; i < w; i += 0.1) {
  //   const y = Math.floor((h / h3) * Math.sin(i / w2) + h / 2 + y1);
  //   const x = Math.floor(i + w);
  //   for (let j = 0; j < bl; j++) {
  //     img.drawPoint(x, y + j, color);
  //   }
  // }

  const p = 'ABCDEFGHKMNPQRSTUVWXYZ3456789';
  let str = '';
  for (let i = 0; i < 5; i++) {
    str += p.charAt((Math.random() * p.length) | 0);
  }

  const fonts = [BMP24.font8x16, BMP24.font12x24, BMP24.font16x32];
  let x = 15,
    y = 8;
  for (let i = 0; i < str.length; i++) {
    const f = fonts[(Math.random() * fonts.length) | 0];
    y = 8 + rand(-10, 10);
    img.drawChar(str[i], x, y, f, rand(0, 0xffffff));
    x += f.w + rand(2, 8);
  }
  return {
    text: str,
    img,
  };
}
