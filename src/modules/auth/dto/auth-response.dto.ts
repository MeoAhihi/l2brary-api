import { ApiProperty } from '@nestjs/swagger';
import { MemberProfileResponseDto } from '../../member-profile/dto/member-profile-response.dto';

export class AuthResponseDto {
  @ApiProperty({ description: 'The JSON Web Token for authentication' })
  accessToken: string;

  @ApiProperty({ description: 'The profile information of the authenticated user' })
  user: MemberProfileResponseDto;
}