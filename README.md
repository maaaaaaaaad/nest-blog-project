# Blog backend with Nest.js

1. Make a simple CRUD
2. Create user data repository from MongoDB
3. New experience about pipes and cors origin

## 1. Main.ts

```javascript
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept',
  });
  await app.listen(5000);
}
bootstrap();
```

## 2. Root Module

```javascript
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContainerModule } from './container/container.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest-blog', {
      useNewUrlParser: true,
      useFindAndModify: false,
    }),
    ContainerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

## 3. Main Module

```javascript
import { Module } from '@nestjs/common';
import { ContainerService } from './container.service';
import { ContainerController } from './container.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { blogDataSchema } from './schemas/blog-data.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'PostData', schema: blogDataSchema, collection: 'allpost' },
    ]),
  ],
  providers: [ContainerService],
  controllers: [ContainerController],
})
//
export class ContainerModule {}
```

## 3. Service logic

```javascript
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

  async deletePostData(id: string): Promise<any> {
    return await this.postModel.findByIdAndRemove(id);
  }
}
```

## 4. Controllers

```javascript
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

```
