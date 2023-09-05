import { NotNeedLogin } from '@/common/decorator/NotNeedLogin';
import { ApiResponseWrap } from '@/common/decorator/swagger';
import { responseSuccess } from '@/utils/result';
import { Controller, Get } from '@nestjs/common';
import { ImageCodeService } from '../service/imageCode.service';
import { CreateImageCodeResponse } from '../dto/createImageCode.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

@ApiTags('system')
@Controller('system')
export class SystemController {
  constructor(
    private readonly imageCodeService: ImageCodeService,
    private readonly configService: ConfigService,
  ) {}

  /** 生成图片验证码 */
  @ApiOperation({ summary: '生成图片验证码' })
  @Get('/createImageCode')
  @ApiResponseWrap(CreateImageCodeResponse)
  @NotNeedLogin()
  async createImageCode() {
    const resp = await this.imageCodeService.createImageCode();
    if (!['development', 'test'].includes(this.configService.get('NODE_ENV'))) {
      delete resp.imageCode;
    }
    return responseSuccess(resp);
  }
}
