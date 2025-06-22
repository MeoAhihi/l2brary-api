import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateClassDto } from './create-class.dto';
import { Class } from '../entities/class.entity';

export class UpdateClassDto extends PartialType(
  OmitType(Class, [
    'name',
    'day',
    'frequency',
    'start_at',
    'end_at',
    'message_group_url',
  ]),
) {}
