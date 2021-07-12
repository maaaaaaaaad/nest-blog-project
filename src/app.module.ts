import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContainerModule } from './container/container.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest-blog', {
      useNewUrlParser: true,
    }),
    ContainerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
