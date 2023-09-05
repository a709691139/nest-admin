import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { createWriteStream } from 'fs';
import { join, extname } from 'path';
import {
  Controller,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';
import { ConfigService } from '@nestjs/config';
import { responseSuccess } from '@/utils/result';
import { ApiResponseWrap } from '@/common/decorator/swagger';
import { UploadResponse } from './dto/upload.dto';
import * as fs from 'fs';

@ApiTags('上传文件')
@Controller('upload')
export class UploadController {
  constructor(private readonly configService: ConfigService) {}

  @Post('/localFile')
  @ApiOperation({ summary: '上传文件到服务器本地' })
  @UseInterceptors(FileInterceptor('file'))
  @ApiResponseWrap(UploadResponse)
  uploadFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType:
            /(.jpg|.jpeg|.png|.gif|.bmp|.svg|.doc|.docx|.xls|.xlsx|.ppt|.pptx)$/i,
        })
        .addMaxSizeValidator({
          maxSize: 10 * 1024 * 1024,
        })
        .build(),
    )
    file: Express.Multer.File,
  ) {
    const extension: string = extname(file.originalname);
    const filename: string = uuidv4() + extension;
    let localPath =
      this.configService.get('upload')?.localPath || './public/upload/';
    if (localPath.indexOf('./') === 0) {
      localPath = join(process.cwd(), localPath);
    }
    if (!fs.existsSync(localPath)) {
      fs.mkdirSync(localPath, { recursive: true });
    }
    const filePath = join(localPath, filename);
    const writeFile = createWriteStream(filePath);
    writeFile.write(file.buffer);

    const staticAccestsPath =
      this.configService.get<string>('staticAccestsPath') || '/static';
    const localDomain = this.configService.get('upload')?.localDomain;
    return responseSuccess({
      value:
        localDomain +
        join(staticAccestsPath, '/upload', filename).replaceAll('\\', '/'),
    });
  }

  @Post('/oss')
  @ApiOperation({ summary: '上传到oss TODO' })
  @UseInterceptors(FileInterceptor('file'))
  @ApiResponseWrap(UploadResponse)
  uploadOss() {
    // TODO
  }
}
