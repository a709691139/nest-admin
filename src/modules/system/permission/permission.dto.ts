import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsArray, ValidateNested } from 'class-validator';

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
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  buttons: Button[];
}
