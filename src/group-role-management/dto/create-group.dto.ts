import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl, IsNotEmpty } from 'class-validator';

export class CreateGroupDto {
  @ApiProperty({
    example: 'AI Research Team',
    description: 'The name of the group',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'A group for members interested in advanced AI topics.',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: 'https://zalo.me/g/abcdefgh',
    description: 'The invitation link to the Zalo chat',
  })
  @IsUrl()
  zaloLink: string;
}
