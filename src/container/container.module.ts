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
