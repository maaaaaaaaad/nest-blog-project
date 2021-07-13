import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDTO } from './blog-data.dto';

export class UpdatePostData extends PartialType(CreatePostDTO) {}
