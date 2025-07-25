import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Member } from 'src/entities/member.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtPayload } from './stratergies/jwt.strategy';
import { AuthResponseDto } from './dto/auth-response.dto';
import { MemberProfileResponseDto } from '../member-profile/dto/member-profile-response.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: MongoRepository<Member>,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<AuthResponseDto> {
    const { fullName, email, password } = registerDto;

    // 1. Check if user already exists
    const existingMember = await this.memberRepository.findOneBy({ email });
    if (existingMember) {
      throw new ConflictException('An account with this email already exists.');
    }

    // 2. Hash the password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Create and save the new member
    const newMember = this.memberRepository.create({
      fullName,
      email,
      password: hashedPassword,
      // Set default values from your entity definition
      interests: [],
      roleIds: [], // Assign a default 'Member' role ID here if you have one
      groupIds: [],
      notificationPreferences: {
        email: { weeklyDigest: true, instantAlerts: true },
        inApp: { enabled: true },
      },
    });

    const savedMember = await this.memberRepository.save(newMember);

    // 4. Generate and return the token
    return this.login(savedMember);
  }

  async signIn(loginDto: LoginDto): Promise<AuthResponseDto> {
    const { email, password } = loginDto;

    // Find the user, explicitly selecting the password field which is hidden by default
    const member = await this.memberRepository.findOne({
      where: { email },
      select: [
        '_id',
        'email',
        'password',
        'fullName',
        'internationalName',
        'bio',
        'interests',
        'notificationPreferences',
        'roleIds',
        'groupIds',
        'createdAt',
      ],
    });

    if (!member) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    // Check if password matches
    const isPasswordMatch = await bcrypt.compare(password, member.password);

    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    return this.login(member);
  }

  /**
   * Generates a JWT for a given member.
   * This is a private helper, but can be public if needed elsewhere.
   */
  private login(member: Member): AuthResponseDto {
    const payload: JwtPayload = {
      email: member.email,
      sub: member._id.toHexString(), // Use 'sub' (subject) as a standard claim for user ID
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      user: MemberProfileResponseDto.fromEntity(member),
    };
  }
}
