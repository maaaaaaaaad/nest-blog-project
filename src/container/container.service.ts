import { UpdatePostData } from './dto/update-data.dto';
import { CreatePostDTO } from './dto/blog-data.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostData } from './types/blog-data.interface';

@Injectable()
export class ContainerService {
  constructor(
    @InjectModel('PostData') private readonly postModel: Model<PostData>,
  ) {}
  //
  async addNewPostData(createPost: CreatePostDTO): Promise<PostData> {
    return await this.postModel.create(createPost);
  }

  async getAllPostData(): Promise<PostData[]> {
    return await this.postModel.find().exec();
  }

  async getOnePostData(id: string): Promise<PostData> {
    return await this.postModel.findById(id);
  }

  async updatePostData(
    id: string,
    updatePostData: UpdatePostData,
  ): Promise<PostData> {
    //
    return await this.postModel.findByIdAndUpdate(id, updatePostData, {
      new: true,
    });
  }
}
