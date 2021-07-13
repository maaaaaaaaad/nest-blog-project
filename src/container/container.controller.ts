import { UpdatePostData } from './dto/update-data.dto';
import { CreatePostDTO } from './dto/blog-data.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { ContainerService } from './container.service';
import { Response } from 'express';
import { HttpStatus } from '@nestjs/common';
import { ValidateId } from './shared/pipes/validate-id.pipe';

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

    if (datas.length === 0) throw new NotFoundException('Not found any datas!');

    return res.status(HttpStatus.OK).json({
      getAlldataSuccessMessage: 'Get all post data!',
      datas,
    });
  }

  @Get('/post/:postDataId')
  async getOnePost(
    @Param('postDataId', new ValidateId()) id: string,
    @Res() res: Response,
  ) {
    const data = await this.service.getOnePostData(id);

    if (!data) throw new NotFoundException('Not found post data');

    return res.status(HttpStatus.OK).json({
      getMessage: `Get post data by id: ${id}`,
      data,
    });
  }

  @Patch('/post/update')
  async updatePost(
    @Query('id', new ValidateId()) updatePostId: string,
    @Body() updateData: UpdatePostData,
    @Res() res: Response,
  ) {
    //
    this.service.updatePostData(updatePostId, updateData);

    if (!updateData) throw new NotFoundException('Update does not excute!');

    return res.status(HttpStatus.OK).json({
      updatedMessage: 'Update complete!',
    });
  }

  @Delete('/post/delete')
  async deletePost(
    @Query('id', new ValidateId()) deletePostId: string,
    @Res() res: Response,
  ) {
    const deletedData = this.service.deletePostData(deletePostId);

    if (!deletedData) throw new NotFoundException('Not found post data');

    return res.status(HttpStatus.OK).json({
      deleteMessage: 'Delete you selected data!',
    });
  }
}
