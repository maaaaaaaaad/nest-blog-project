import { IsString } from 'class-validator';

export class CreatePostDTO {
  @IsString()
  readonly title: string;

  @IsString()
  readonly description: string;

  @IsString()
  readonly body: string;

  @IsString()
  readonly author: string;

  @IsString()
  readonly data_posted: string;
}
