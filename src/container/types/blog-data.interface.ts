import { Document } from 'mongoose';

export interface PostData extends Document {
  readonly title: string;
  readonly description: string;
  readonly body: string;
  readonly author: string;
  readonly data_posted: string;
}
