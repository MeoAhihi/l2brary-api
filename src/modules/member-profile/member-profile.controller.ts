import {
  Controller,
  Get,
  Patch,
  Param,
  Body,
  UseGuards,
  Req,
  ForbiddenException,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Request } from 'express';
import { MemberProfileService } from './member-profile.service';
import { UpdateMemberProfileDto } from './dto/update-member-profile.dto';
import { MemberProfileResponseDto } from './dto/member-profile-response.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'; // Assuming you have a JWT guard
import { ParseMongoIdPipe } from '../common/pipes/parse-mongo-id.pipe'; // A recommended custom pipe

// This is a mock of what the Express Request object would look like after a JWT guard runs.
// In your actual app, this would be properly typed.
interface AuthenticatedRequest extends Request {
  user: {
    _id: string;
    email: string;
    roles: string[];
  };
}

@ApiTags('Profiles')
@ApiBearerAuth() // Indicates that these endpoints require a bearer token
@UseGuards(JwtAuthGuard) // Protect all routes in this controller
@Controller('profiles')
export class MemberProfileController {
  constructor(private readonly profileService: MemberProfileService) {}

  @Get(':id')
  @ApiOperation({ summary: "Get a member's profile by ID" })
  @ApiResponse({ status: 200, description: 'Profile found.', type: MemberProfileResponseDto })
  @ApiResponse({ status: 404, description: 'Profile not found.' })
  async findOne(
    @Param('id', ParseMongoIdPipe) id: string, // Use a pipe to validate it's a real Mongo ID
  ): Promise<MemberProfileResponseDto> {
    const member = await this.profileService.findOne(id);
    return MemberProfileResponseDto.fromEntity(member);
  }

  @Patch(':id')
  @ApiOperation({ summary: "Update a member's profile" })
  @ApiResponse({ status: 200, description: 'Profile updated successfully.', type: MemberProfileResponseDto })
  @ApiResponse({ status: 403, description: 'Forbidden. You can only update your own profile.' })
  @ApiResponse({ status: 404, description: 'Profile not found.' })
  async update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() updateDto: UpdateMemberProfileDto,
    @Req() req: AuthenticatedRequest, // Get the authenticated user from the request
  ): Promise<MemberProfileResponseDto> {
    // --- SECURITY CHECK ---
    // Ensure the logged-in user is the one they are trying to edit,
    // unless they are an admin (a check for that role could be added here).
    if (req.user._id.toString() !== id) {
      throw new ForbiddenException('You can only update your own profile.');
    }

    const updatedMember = await this.profileService.update(id, updateDto);
    return MemberProfileResponseDto.fromEntity(updatedMember);
  }
}