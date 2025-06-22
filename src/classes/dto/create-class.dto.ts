import { OmitType } from '@nestjs/mapped-types';
import { Class } from '../entities/class.entity';

export class CreateClassDto extends OmitType(Class, [
  'name',
  'day',
  'frequency',
  'start_at',
  'end_at',
  'message_group_url',
]) {}
