import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsNotEmpty } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ example: 'Mentor', description: 'The unique name of the role' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'A role for experienced members who guide others.' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: ['read:all_blogs', 'create:comment', 'validate:skill'],
    description: 'A list of permission strings associated with the role',
  })
  @IsArray()
  @IsString({ each: true })
  permissions: string[];
}