import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class ManageMemberAssignmentDto {
  @ApiProperty({
    description: 'The ID of the member to be assigned or unassigned',
  })
  @IsString()
  @IsNotEmpty()
  memberId: string;
}
