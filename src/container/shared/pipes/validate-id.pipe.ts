import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import * as mongoose from 'mongoose';

@Injectable()
export class ValidateId implements PipeTransform<string> {
  //
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: string, _metadata: ArgumentMetadata) {
    //
    const isValid: boolean = mongoose.Types.ObjectId.isValid(value);
    if (!isValid) throw new BadRequestException('Invalid ID!');
    //
    return value;
  }
}
