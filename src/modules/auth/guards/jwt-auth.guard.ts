import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// This guard simply uses the 'jwt' strategy we defined.
// You can apply it to controllers or specific routes with @UseGuards(JwtAuthGuard)
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
