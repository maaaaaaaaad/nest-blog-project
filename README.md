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
