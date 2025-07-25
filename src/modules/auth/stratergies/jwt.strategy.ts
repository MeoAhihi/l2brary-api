import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

// This payload is what we encoded in the AuthService's login method
export interface JwtPayload {
  email: string;
  sub: string; // The MongoDB ObjectId (_id) of the user
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  // Passport automatically verifies the token signature and expiration.
  // If valid, this method is called with the decoded payload.
  async validate(payload: JwtPayload) {
    // The returned object will be attached to the request as `req.user`
    return { _id: payload.sub, email: payload.email };
  }
}
