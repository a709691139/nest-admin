import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsArray,
  ValidateNested,
  ArrayNotEmpty,
} from 'class-validator';

class Button {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  perms: string;
}
export class CreateButtonsReq {
  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  parentId: string;

  @ApiProperty({
    required: true,
  })
  @ArrayNotEmpty()
  @ValidateNested()
  @Type(() => Button)
  buttons: Button[];
}
