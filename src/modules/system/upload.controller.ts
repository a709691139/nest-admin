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
import { ApiTags } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';
import { ConfigService } from '@nestjs/config';
import { responseSuccess } from '@/utils/result';

@ApiTags('上传文件')
@Controller('upload')
export class UploadController {
  constructor(private readonly configService: ConfigService) {}

  @Post('/file')
  @UseInterceptors(FileInterceptor('file'))
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
    const filename: string = uuidv4();
    const extension: string = extname(file.originalname);
    let localPath =
      this.configService.get('upload')?.localPath || './public/upload/';
    if (localPath.indexOf('./') === 0) {
      localPath = join(process.cwd(), localPath);
    }
    const filePath = join(localPath, `${filename}${extension}`);
    const writeFile = createWriteStream(filePath);
    writeFile.write(file.buffer);

    const staticAccestsPath =
      this.configService.get<string>('staticAccestsPath') || '/static';
    return responseSuccess(join(staticAccestsPath, filePath));
  }
}
