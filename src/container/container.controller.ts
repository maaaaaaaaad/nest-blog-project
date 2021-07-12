import { CreatePostDTO } from './dto/blog-data.dto';
import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
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

  @Get('/:postDataId')
  async getOnePost(@Param('postDataId') id: string, @Res() res: Response) {
    const data = await this.service.getOnePostData(id);

    return res.status(HttpStatus.OK).json({
      getMessage: `Get post data by id: ${id}`,
      data,
    });
  }
}
