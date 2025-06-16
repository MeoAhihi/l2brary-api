import { PartialType } from '@nestjs/mapped-types';
import { CreateSessionDto } from './create-session.dto';

export class UpdateSessionDto extends PartialType(CreateSessionDto) {
  ended_at?: Date;

  talker_fullname?: string;

  general_score?: number;

  active_score?: number;

  academic_score?: number;

  smile_score?: number;
}
