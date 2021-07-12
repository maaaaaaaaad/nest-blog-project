import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostData } from './types/blog-data.interface';

@Injectable()
export class ContainerService {
  constructor(
    @InjectModel('PostData') private readonly postModel: Model<PostData>,
  ) {}
}
