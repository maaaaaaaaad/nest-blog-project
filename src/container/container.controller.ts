import { UpdatePostData } from './dto/update-data.dto';
import { CreatePostDTO } from './dto/blog-data.dto';
import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { ContainerService } from './container.service';
import { Response } from 'express';
import { HttpStatus } from '@nestjs/common';

@Controller('container')
export class ContainerController {
  constructor(private readonly service: ContainerService) {}
  //
  @Post('/post')
  async addNewPost(@Body() userPostData: CreatePostDTO, @Res() res: Response) {
    const data = await this.service.addNewPostData(userPostData);

    return res.status(HttpStatus.OK).json({
      successMessage: 'Post data complete!',
      data,
    });
  }

  @Get('/post')
  async getAllPost(@Res() res: Response) {
    const datas = await this.service.getAllPostData();

    return res.status(HttpStatus.OK).json({
      getAlldataSuccessMessage: 'Get all post data!',
      datas,
    });
  }

  @Get('/:postDataId')
  async getOnePost(@Param('postDataId') id: string, @Res() res: Response) {
    const data = await this.service.getOnePostData(id);

    return res.status(HttpStatus.OK).json({
      getMessage: `Get post data by id: ${id}`,
      data,
    });
  }

  @Patch('/update/:updatePostId')
  async updatePost(
    @Param('updatePostId') updatePostId: string,
    @Body() updateData: UpdatePostData,
    @Res() res: Response,
  ) {
    //
    this.service.updatePostData(updatePostId, updateData);

    if (!updateData) {
      throw new NotFoundException('Update does not excute!');
    }

    return res.status(HttpStatus.OK).json({
      updatedMessage: 'Update complete!',
    });
  }
}
