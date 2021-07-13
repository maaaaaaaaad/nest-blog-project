import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ContainerService } from './container.service';
import { ContainerController } from './container.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { blogDataSchema } from './schemas/blog-data.schema';
import { AuthenticationMiddleware } from 'src/common/authentication.middleware';

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
export class ContainerModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    //
    consumer.apply(AuthenticationMiddleware).forRoutes(
      {
        method: RequestMethod.POST,
        path: '/container/post',
      },
      {
        method: RequestMethod.PATCH,
        path: '/container/post/update',
      },
      {
        method: RequestMethod.DELETE,
        path: '/container/post/delete',
      },
    );
  }
}
